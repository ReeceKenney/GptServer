import OpenAIApi from "openai";

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export const makeImageRequest = async (prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "256x256",
  });

  if (response.data) {
    return response.data;
  }

  throw new Error("Response is in an unsupported format");
};

export const makeChatRequest = async (messages, chatOptions) => {
  const response = await openai.chat.completions.create({
    ...chatOptions,
    model: "gpt-3.5-turbo",
    messages,
  });

  if (response.choices) {
    let responseText = response.choices[0].message.content;
    return responseText.replace(/(\r\n|\n|\r)/gm, "");
  }

  throw new Error("The response is in an unsupported format");
};
