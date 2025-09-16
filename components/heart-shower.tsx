"use client"

import { useEffect, useState } from "react"

export default function HeartShower() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    // Create 50 hearts with random positions and delays
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }))

    setHearts(newHearts)
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}
