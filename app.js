import express from "express";
import { makeChatRequest, makeImageRequest } from "./gptUtils.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { messages, chatOptions } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res
      .status(400)
      .send("The 'messages' field is required and must be a non empty array");
  }

  try {
    const response = await makeChatRequest(messages, chatOptions);
    return res.json({ response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("An error occurred while processing the request");
  }
});

app.post("/image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("The 'prompt' field is required.");
  }

  try {
    const response = await makeImageRequest(prompt);
    return res.json({ response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("An error occurred while processing the request");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
