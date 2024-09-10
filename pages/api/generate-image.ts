import { NextApiRequest, NextApiResponse } from "next"


type RequestProps = {
  prompt: string;
};


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const gptApiKey = process.env.GPT_URL;
  const gptUrl = process.env.GPT_API_KEY;

  if (!gptApiKey || !gptUrl) {
    return response.status(500).json({ error: "API key or URL is missing in environment variables" });
  }

  try {
    const { prompt }: RequestProps = request.body;

    const res = await fetch(gptUrl, {
      method: "POST",
      body: JSON.stringify({
        text: prompt,
        width: 512,
        height: 512
      }),
      headers: {
        'x-rapidapi-key': gptApiKey,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from DALLE");
    }

    const data = await res.json();

    return response.status(200).json({
      message: data?.generated_image || "https://via.placeholder.com/600x400?text=Generated+Image",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

export default handler