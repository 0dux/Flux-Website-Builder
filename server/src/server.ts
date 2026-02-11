import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import env from "./config/env.js";
import { auth } from "./lib/auth.js";
import projectRouter from "./routes/project.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = env.PORT;

app.use(helmet())
app.use(express.json({ limit: "50mb" }))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Too many requests, please try again later" }
});


app.use(limiter)

const corsOptions = {
    origin: env.TRUSTED_ORIGINS,
    credentials: true
}
app.use(cors(corsOptions))

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});