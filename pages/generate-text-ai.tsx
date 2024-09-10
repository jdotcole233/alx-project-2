import React, { useState } from 'react';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(''); // State for storing the user's input
  const [output, setOutput] = useState<string>(''); // State for storing the generated text output
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const generateText = async () => {
    setIsLoading(true);
    const resp = await fetch('/api/secret', {
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
    setOutput(data?.key);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 flex flex-col justify-center items-center text-white">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to TextGen</h1>
        <p className="text-lg max-w-xl mx-auto">
          This simple app allows you to input any prompt, and it will generate a text response for you. Enter a prompt in the box below and click "Generate Text" to see the magic happen!
        </p>
      </header>

      <div
        className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Enter your prompt:
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>


        <button
          onClick={generateText}
          className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          {
            isLoading ? "Generating..." : "Generate Text"
          }
          
        </button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg w-full max-w-lg text-gray-800 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-4">Generated Text</h2>
          <p className="text-gray-700">{output}</p>
        </div>
      )}

      {/* Footer Section */}
      <footer className="mt-12 text-center text-sm text-gray-200">
        © 2024 TextGen | Powered by ChatGPT API
      </footer>
    </div>
  );
};



export default TextGenerator;

// {"status":"Task is in queue","uuid":"a0f33c6b-88d4-4bac-9587-e7eeaceed32b"}