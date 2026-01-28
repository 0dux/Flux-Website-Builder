import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session || !session.user) {
            res.status(401).json({
                message: "Unauthorized user"
            })
        }

        req.userId = session?.user.id
        next();
    } catch (error: any) {
        console.error("error:: ", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

export default protect