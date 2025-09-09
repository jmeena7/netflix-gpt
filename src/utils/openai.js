import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_GPT_KEY,
});

export default openai;
