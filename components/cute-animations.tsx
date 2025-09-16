"use client"

import { useState } from "react"

export default function CuteAnimations() {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)

  const animations = [
    { id: "bounce", emoji: "🐰", name: "Bunny Hop" },
    { id: "spin", emoji: "🌟", name: "Twinkle Star" },
    { id: "pulse", emoji: "💖", name: "Heartbeat" },
    { id: "wiggle", emoji: "🦋", name: "Butterfly Dance" },
  ]

  const handleAnimationClick = (id: string) => {
    setActiveAnimation(id)
    setTimeout(() => setActiveAnimation(null), 2000)
  }

  return (
    <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl border border-pink-200">
      <h3 className="text-2xl font-bold text-pink-600 mb-4">Cute Animations</h3>
      <div className="grid grid-cols-2 gap-4">
        {animations.map((anim) => (
          <button
            key={anim.id}
            onClick={() => handleAnimationClick(anim.id)}
            className={`p-4 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 ${
              activeAnimation === anim.id ? getAnimationClass(anim.id) : ""
            }`}
          >
            <div className="text-3xl mb-2">{anim.emoji}</div>
            <div className="text-sm text-pink-600 font-medium">{anim.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function getAnimationClass(id: string): string {
  switch (id) {
    case "bounce":
      return "animate-bounce"
    case "spin":
      return "animate-spin"
    case "pulse":
      return "animate-pulse"
    case "wiggle":
      return "animate-wiggle"
    default:
      return ""
  }
}
