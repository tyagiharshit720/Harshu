"use client"

import { useState } from "react"

export default function InteractiveHeart() {
  const [clicks, setClicks] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleHeartClick = () => {
    setClicks(clicks + 1)
    setIsAnimating(true)

    setTimeout(() => setIsAnimating(false), 600)
  }

  const getHeartMessage = () => {
    if (clicks < 5) return "Click me! 💕"
    if (clicks < 10) return "You're making me blush! 😊"
    if (clicks < 20) return "I love you too! ❤️"
    if (clicks < 50) return "You can't stop, can you? 😄"
    return "You're absolutely adorable! 🥰"
  }

  return (
    <div className="text-center fade-in-up">
      <div
        onClick={handleHeartClick}
        className={`inline-block cursor-pointer transition-all duration-300 hover:scale-110 ${
          isAnimating ? "animate-bounce scale-125" : ""
        }`}
      >
        <div className="text-8xl md:text-9xl select-none">{clicks > 30 ? "💖" : clicks > 15 ? "💕" : "❤️"}</div>
      </div>
      <p className="text-lg text-primary font-semibold mt-4">{getHeartMessage()}</p>
      <p className="text-sm text-muted-foreground mt-2">Clicked {clicks} times</p>
    </div>
  )
}
