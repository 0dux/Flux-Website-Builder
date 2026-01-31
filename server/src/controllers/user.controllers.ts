import { Request, Response } from "express";
import openai from "../config/openai.js";
import { prisma } from "../lib/prisma.js";


// Credits
export const getUserCredits = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        return res.json({
            credits: user?.credits
        })
    } catch (error: any) {
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}


// Create a new project
export const createNewProject = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const { initial_prompt } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (user && user?.credits < 5) {
            return res.status(403).json({
                message: "Insufficient credits to create a project"
            })
        }

        // create new project

        const project = await prisma.websiteProject.create({
            data: {
                name: initial_prompt.length > 50 ? initial_prompt.substring(0, 47) + "..." : initial_prompt,
                initial_prompt,
                userId
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: {
                totalCreation: { increment: 1 }
            }
        })

        await prisma.conversation.create({
            data: {
                role: "user",
                content: initial_prompt,
                projectId: project.id
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: {
                credits: { decrement: 5 }
            }
        })

        res.json({
            projectId: project.id
        })

        const promptEnhanceResponse = await openai.chat.completions.create({
            model: "arcee-ai/trinity-large-preview:free",
            messages: [
                {
                    role: "system",
                    content: `You are a prompt enhancement specialist. Take the user's website request and expand it into a detailed, comprehensive prompt that will help create the best possible website.

    Enhance this prompt by:
    1. Adding specific design details (layout, color scheme, typography)
    2. Specifying key sections and features
    3. Describing the user experience and interactions
    4. Including modern web design best practices
    5. Mentioning responsive design requirements
    6. Adding any missing but important elements

Return ONLY the enhanced prompt, nothing else. Make it detailed but concise (2-3 paragraphs max).`
                }, {
                    role: "user",
                    content: initial_prompt
                }
            ]
        });

        const enhancedPrompt = promptEnhanceResponse.choices[0].message.content;

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: `I've enhaced your prompt to: ${enhancedPrompt}`,
                projectId: project.id
            }
        })

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: "Now generating your website...",
                projectId: project.id
            }
        })

        // Generate website code

        const codeGenerationResponse = await openai.chat.completions.create({
            model: "arcee-ai/trinity-large-preview:free",
            messages: [
                {
                    "role": "system",
                    "content": `You are an expert web developer. Create a complete, production-ready, single-page website based on this request: "${enhancedPrompt}"

    CRITICAL REQUIREMENTS:
    - You MUST output valid HTML ONLY. 
    - Use Tailwind CSS for ALL styling
    - Include this EXACT script in the <head>: <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    - Use Tailwind utility classes extensively for styling, animations, and responsiveness
    - Make it fully functional and interactive with JavaScript in <script> tag before closing </body>
    - Use modern, beautiful design with great UX using Tailwind classes
    - Make it responsive using Tailwind responsive classes (sm:, md:, lg:, xl:)
    - Use Tailwind animations and transitions (animate-*, transition-*)
    - Include all necessary meta tags
    - Use Google Fonts CDN if needed for custom fonts
    - Use placeholder images from https://placehold.co/600x400
    - Use Tailwind gradient classes for beautiful backgrounds
    - Make sure all buttons, cards, and components use Tailwind styling

    CRITICAL HARD RULES:
    1. You MUST put ALL output ONLY into message.content.
    2. You MUST NOT place anything in "reasoning", "analysis", "reasoning_details", or any hidden fields.
    3. You MUST NOT include internal thoughts, explanations, analysis, comments, or markdown.
    4. Do NOT include markdown, explanations, notes, or code fences.

    The HTML should be complete and ready to render as-is with Tailwind CSS.`
                }, {
                    role: "user",
                    content: enhancedPrompt || "",
                }
            ]
        });

        const code = codeGenerationResponse.choices[0].message.content || "";

        const version = await prisma.version.create({
            data: {
                code: code.replace(/```[a-z]*\n?/gi, '')
                    .replace(/```$/g, '')
                    .trim(),
                description: 'Initial version',
                projectId: project.id
            }
        })

        await prisma.conversation.create({
            data: {
                role: "assistant",
                content: "I've created your website!, You can now preview it and request any changes.",
                projectId: project.id
            }
        })

        await prisma.websiteProject.update({
            where: { id: project.id },
            data: {
                current_code: code.replace(/```[a-z]*\n?/gi, '')
                    .replace(/```$/g, '')
                    .trim(),
                current_version_index: version.id
            }
        })
    } catch (error: any) {
        await prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: 5 } }
        })
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}


// get the current project
export const getUserProject = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        const { projectId } = req.params;
        const project = await prisma.websiteProject.findUnique({
            where: { id: projectId as string, userId },
            include: {
                conversation: {
                    orderBy: {
                        timestamp: "asc"
                    }
                },
                versions: {
                    orderBy: {
                        timestamp: "asc"
                    }
                }
            }
        });

        return res.json({
            project
        })

    } catch (error: any) {
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}


// get all the projects made by the user
export const getUserAllProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        const projects = await prisma.websiteProject.findMany({
            where: { userId },
            orderBy: {
                updatedAt: "desc"
            }
        });

        return res.json({
            projects
        })

    } catch (error: any) {
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}


// publish website
export const togglePublish = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized user."
            })
        }

        const { projectId } = req.params;

        const project = await prisma.websiteProject.findUnique({
            where: { id: projectId as string, userId },

        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found!"
            })
        }

        await prisma.websiteProject.update({
            where: { id: projectId as string },
            data: {
                isPublished: !project.isPublished
            }
        });

        return res.json({
            message: !project.isPublished ? "Project is now Unpublished" : "Project is now Published"
        })

    } catch (error: any) {
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

// purchase credits
export const purchaseCredits = async (req: Request, res: Response) => {
}