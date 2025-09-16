"use client"

import { useState, useEffect } from "react"

const reasons = [
  "Your beautiful smile lights up my world",
  "The way you laugh at my silly jokes",
  "How you make everything better just by being there",
  "Your kind and caring heart",
  "The way you understand me without words",
  "How you make ordinary moments magical",
  "Your amazing hugs that feel like home",
  "The sparkle in your eyes when you're happy",
  "How you believe in me even when I don't",
  "The way you make me want to be a better person",
]

export default function ReasonsILoveYou() {
  const [currentReason, setCurrentReason] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentReason((prev) => (prev + 1) % reasons.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center p-6 bg-gradient-to-r from-pink-100 to-red-100 rounded-3xl border border-pink-200">
      <h3 className="text-2xl font-bold text-pink-600 mb-4">Why I Love You</h3>
      <div className="h-16 flex items-center justify-center">
        <p
          className={`text-lg text-pink-700 font-medium transition-opacity duration-500 text-pretty ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {reasons[currentReason]} ❤️
        </p>
      </div>
      <div className="flex justify-center mt-4">
        {reasons.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 transition-colors duration-300 ${
              index === currentReason ? "bg-pink-500" : "bg-pink-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
