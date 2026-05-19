"use client";

import { useState } from "react";

const quotes = [
  "七転び八起き • Levántate siempre.",
  "El enfoque vence al talento.",
  "Pequeños pasos todos los días.",
  "La disciplina crea libertad.",
  "集中して • Mantente concentrado.",
];

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
];

export default function ZenPage() {
  const [quote, setQuote] = useState(quotes[0]);
  const [bg, setBg] = useState(backgrounds[0]);

  const randomQuote = () => {
    const random =
      quotes[Math.floor(Math.random() * quotes.length)];

    setQuote(random);
  };

  const randomBackground = () => {
    const random =
      backgrounds[
        Math.floor(Math.random() * backgrounds.length)
      ];

    setBg(random);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-8 transition-all duration-500"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-10 max-w-2xl text-center border border-white/10 shadow-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">
          Zen Mode
        </h1>

        <p className="text-zinc-200 text-xl italic mb-10">
          {quote}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={randomQuote}
            className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold text-white"
          >
            Nueva frase
          </button>

          <button
            onClick={randomBackground}
            className="bg-black/70 hover:bg-black transition px-6 py-3 rounded-xl font-semibold text-white border border-zinc-700"
          >
            Cambiar ambiente
          </button>
        </div>
      </div>
    </main>
  );
}