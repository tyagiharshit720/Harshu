"use client"

import { useState, useEffect } from "react"

export default function LoveMeter() {
  const [loveLevel, setLoveLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoveLevel((prev) => {
        const newLevel = prev + Math.random() * 2
        return newLevel > 100 ? 100 : newLevel
      })
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      setLoveLevel(100)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-6 bg-white/50 rounded-3xl backdrop-blur-sm border border-pink-200">
      <h3 className="text-2xl font-bold text-pink-600 mb-4">Love Meter 💖</h3>
      <div className="relative w-full h-8 bg-pink-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-red-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${loveLevel}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {Math.round(loveLevel)}%
        </div>
      </div>
      <p className="text-pink-600 font-medium">
        {loveLevel === 100 ? "Love Level: INFINITE! 💕" : "Calculating love level..."}
      </p>
    </div>
  )
}
