"use client"

import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      emoji: string
      left: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const emojis = ["💖", "💕", "🌹", "✨", "💝", "🦋", "🌟", "💗"]
    const newElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }))

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute text-2xl opacity-30 twinkle"
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  )
}
