import { OpenAI } from "openai";
import envs from "./env.js";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: envs.OPENROUTER_API_KEY,
});

export default openai;
