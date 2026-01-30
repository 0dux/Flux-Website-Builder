import { Request, Response } from "express";
import openai from "../config/ai.js";
import { prisma } from "../lib/prisma.js";

export const makeRevisions = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const { projectId } = req.params;
        const { message } = req.body;

        if (!projectId || typeof projectId !== "string") {
            return res.status(400).json({
                message: "Invalid project ID."
            })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!userId || !user) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        if (user.credits < 5) {
            return res.status(403).json({
                message: "Not enough credits"
            })
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({
                message: "Enter a valid prompt."
            })
        }

        const currentProject = await prisma.websiteProject.findUnique({
            where: { id: projectId, userId },
            include: {
                versions: true
            }
        })

        if (!currentProject) {
            return res.status(404).json({
                message: "Project not found.    "
            })
        }

        await prisma.conversation.create({
            data: {
                role: "user",
                content: message,
                projectId,
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 5 } }
        })

        const promptEnhanceResponse = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                {
                    role: "system",
                    content: `You are a prompt enhancement specialist. The user wants to make changes to their website. Enhance their request to be more specific and actionable for a web developer.

    Enhance this by:
    1. Being specific about what elements to change
    2. Mentioning design details (colors, spacing, sizes)
    3. Clarifying the desired outcome
    4. Using clear technical terms

Return ONLY the enhanced request, nothing else. Keep it concise (1-2 sentences).`
                }, {
                    role: "user",
                    content: `User request :: "${message}"`
                }
            ]
        });

        const enhancedPrompt = promptEnhanceResponse.choices[0].message.content;

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: `I've enhanced your prompt to :: ${enhancedPrompt}`,
                projectId
            }
        })

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: `Now making changes to your website...`,
                projectId
            }
        })

        const codeGenerationResponse = await openai.chat.completions.create({
            model: "z-ai/glm-4.5-air:free",
            messages: [
                {
                    "role": "system",
                    "content": `You are an expert web developer. 

    CRITICAL REQUIREMENTS:
    - Return ONLY the complete updated HTML code with the requested changes.
    - Use Tailwind CSS for ALL styling (NO custom CSS).
    - Use Tailwind utility classes for all styling changes.
    - Include all JavaScript in <script> tags before closing </body>
    - Make sure it's a complete, standalone HTML document with Tailwind CSS
    - Return the HTML Code Only, nothing else

    Apply the requested changes while maintaining the Tailwind CSS styling approach.`
                }, {
                    role: "user",
                    content: `Here is the current website code:"${currentProject.current_code}" The user wants this change:"${enhancedPrompt}"`,
                }
            ]
        });

        const code = codeGenerationResponse.choices[0].message.content || "";

        const version = await prisma.version.create({
            data: {
                code: code.replace(/```[a-z]*\n?/gi, '')
                    .replace(/```$/g, '')
                    .trim(),
                description: 'Changes made',
                projectId
            }
        })

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: "I've made changes to your website! You can now preview it.",
                projectId
            }
        })

        await prisma.websiteProject.update({
            where: { id: projectId },
            data: {
                current_code: code.replace(/```[a-z]*\n?/gi, '')
                    .replace(/```$/g, '')
                    .trim(),
                current_version_index: version.id
            }
        })
        return res.json({
            message: "Changes made succesfully"
        })
    } catch (error: any) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                credits: { decrement: 5 }
            }
        })
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}