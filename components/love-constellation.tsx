"use client"

import { useState, useEffect } from "react"

interface Star {
  id: number
  x: number
  y: number
  message: string
  clicked: boolean
}

export default function LoveConstellation() {
  const [stars, setStars] = useState<Star[]>([])
  const [revealedMessages, setRevealedMessages] = useState<string[]>([])

  const loveMessages = [
    "You light up my darkest nights ✨",
    "Every star reminds me of your sparkle 💫",
    "You're my wish upon a star 🌟",
    "Together we create our own galaxy 🌌",
    "Your love is written in the stars 💖",
    "You make my universe complete 🌠",
    "Our love story is cosmic 🚀",
    "You're the brightest star in my sky ⭐",
  ]

  useEffect(() => {
    const newStars = loveMessages.map((message, index) => ({
      id: index,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      message,
      clicked: false,
    }))
    setStars(newStars)
  }, [])

  const handleStarClick = (starId: number) => {
    setStars((prev) => prev.map((star) => (star.id === starId ? { ...star, clicked: true } : star)))

    const clickedStar = stars.find((star) => star.id === starId)
    if (clickedStar && !revealedMessages.includes(clickedStar.message)) {
      setRevealedMessages((prev) => [...prev, clickedStar.message])
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-900 via-blue-900 to-black rounded-lg p-6 min-h-96 relative overflow-hidden">
      <h3 className="text-2xl font-bold text-white text-center mb-4 glow-text">Our Love Constellation 🌌</h3>
      <p className="text-purple-200 text-center mb-6 text-sm">
        Click on each star to reveal a love message written just for you
      </p>

      <div className="relative h-64">
        {stars.map((star) => (
          <button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className={`absolute w-4 h-4 rounded-full transition-all duration-500 hover:scale-150 ${
              star.clicked
                ? "bg-yellow-300 shadow-lg shadow-yellow-300/50 animate-pulse"
                : "bg-white hover:bg-yellow-200"
            }`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <span className="sr-only">Star {star.id + 1}</span>
          </button>
        ))}
      </div>

      {revealedMessages.length > 0 && (
        <div className="mt-6 space-y-2 max-h-32 overflow-y-auto">
          {revealedMessages.map((message, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-sm fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {message}
            </div>
          ))}
        </div>
      )}

      {revealedMessages.length === loveMessages.length && (
        <div className="mt-4 text-center">
          <div className="text-yellow-300 font-bold text-lg animate-bounce">
            You've discovered all our love stars! 🌟💕
          </div>
        </div>
      )}
    </div>
  )
}
