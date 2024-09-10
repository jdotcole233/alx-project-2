import Image from 'next/image';
import React, { useState } from 'react';

const TextToImage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)



  const handleGenerateImage = async () => {
    setIsLoading(true);
    const resp = await fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })

    const data = await resp.json()
    setIsLoading(false)
    setImageSrc(data.message);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Text to Image Generator</h1>

      {/* Description */}
      <p className="text-lg mb-8 text-center w-4/5 md:w-3/5">
        Welcome to the Text to Image Generator! Simply enter a description of the image you want to generate in the input box below, and click the "Generate Image" button to see the magic happen. Try anything from landscapes, abstract art, or even futuristic cityscapes!
      </p>

      {/* Form and Input Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-800">
        {/* Input field for the prompt */}
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700 text-lg font-semibold mb-2">
            Enter your image prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., A sunset over a mountain range..."
          />
        </div>

        {/* Button to generate image */}
        <button
          onClick={handleGenerateImage}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {
            isLoading ? "Generating Image..." : "Generate Image"
          }
          
        </button>
      </div>

      {/* Instructions */}
      {/* <div className="mt-6 text-center w-4/5 md:w-3/5">
        <h2 className="text-2xl font-semibold mb-2">How to Use:</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Step 1: Enter a description of the image you want to generate.</li>
          <li>Step 2: Click the "Generate Image" button.</li>
          <li>Step 3: View the generated image below.</li>
        </ul>
      </div> */}

      {/* Output image */}
      {imageSrc && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Image:</h2>
          <img width={512} height={512} src={imageSrc} alt="Generated" className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default TextToImage;
