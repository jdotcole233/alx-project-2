import { NextApiRequest, NextApiResponse } from "next";

type RequestProps = {
  prompt: string;
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  // Check if the environment variables are present
  const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
  const huggingFaceUrl = process.env.NEXT_PUBLIC_HUGGING_FACE_URL;

  if (!huggingFaceApiKey || !huggingFaceUrl) {
    return response.status(500).json({ error: "API key or URL is missing in environment variables" });
  }

  try {
    const { prompt }: RequestProps = request.body;

    const res = await fetch(huggingFaceUrl, {
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
      }),
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        Accept: "application/json",
        "Content-type": "application/json"
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from Hugging Face API");
    }

    const data = await res.json();

    return response.status(200).json({
      content: "some content",
      key: data[0]?.generated_text || "No text generated",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
