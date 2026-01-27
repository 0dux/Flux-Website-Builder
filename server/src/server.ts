import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import env from "./config/env.js";

const app = express();

const port = env.PORT;

const corsOptions = {
    origin: env.TRUSTED_ORIGINS,
    credentials: true
}

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});