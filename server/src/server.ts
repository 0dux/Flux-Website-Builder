import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import env from "./config/env.js";
import { auth } from "./lib/auth.js";

const app = express();

const port = env.PORT;

const corsOptions = {
    origin: env.TRUSTED_ORIGINS,
    credentials: true
}

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});