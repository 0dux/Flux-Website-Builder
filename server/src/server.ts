import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import helmet from "helmet";
import envs from "./config/env.js";
import { auth } from "./lib/auth.js";
import projectRouter from "./routes/project.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const port = envs.PORT;

app.set('trust proxy', true);
app.use(helmet())
app.use(express.json({ limit: "50mb" }))

const corsOptions = {
    origin: [envs.TRUSTED_ORIGIN, envs.BETTER_AUTH_URL], // Allow both frontend and backend
    credentials: true
}
app.use(cors(corsOptions))

// Auth routes BEFORE rate limiting
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});