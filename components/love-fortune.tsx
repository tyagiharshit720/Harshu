"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function LoveFortune() {
  const [currentFortune, setCurrentFortune] = useState("")
  const [isRevealing, setIsRevealing] = useState(false)

  const fortunes = [
    "Today your love will shine brighter than the stars ✨",
    "A sweet surprise awaits you from someone special 💕",
    "Your heart will be filled with joy and laughter today 😊",
    "Love will find you in the most unexpected moments 💖",
    "Today is perfect for creating beautiful memories together 📸",
    "Your smile will light up someone's entire world today 🌟",
    "A romantic gesture will make your day extra special 🌹",
    "Love surrounds you like a warm, cozy blanket 🤗",
    "Today brings new reasons to fall in love all over again 💘",
    "Your love story continues to be written in the stars 🌌",
  ]

  const revealFortune = () => {
    setIsRevealing(true)
    setTimeout(() => {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      setCurrentFortune(randomFortune)
      setIsRevealing(false)
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 text-center">
      <h3 className="text-2xl font-bold text-purple-800 mb-4">Love Fortune Crystal Ball 🔮</h3>

      <div className="mb-6">
        <div className={`text-6xl mb-4 transition-transform duration-1000 ${isRevealing ? "animate-spin" : ""}`}>
          🔮
        </div>

        {isRevealing ? (
          <div className="text-purple-600 animate-pulse">The crystal ball is revealing your love fortune...</div>
        ) : currentFortune ? (
          <div className="bg-white/70 rounded-lg p-4 text-purple-800 font-medium fade-in-up">{currentFortune}</div>
        ) : (
          <div className="text-purple-600">Click the crystal ball to reveal your love fortune for today</div>
        )}
      </div>

      <Button onClick={revealFortune} disabled={isRevealing} className="bg-purple-500 hover:bg-purple-600 text-white">
        {isRevealing ? "Revealing..." : "Get My Love Fortune"}
      </Button>
    </div>
  )
}
