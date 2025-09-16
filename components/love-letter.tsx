"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LoveLetterProps {
  onClose: () => void
}

export default function LoveLetter({ onClose }: LoveLetterProps) {
  const [showSurprise, setShowSurprise] = useState(false)

  const poem = `My Dearest Love,

In your eyes, I see my future bright,
Your smile makes everything feel right.
With every heartbeat, with every breath,
I choose you now, until my death.

You are my sunshine, my guiding star,
No matter the distance, no matter how far.
In your arms, I've found my home,
With you, I'll never be alone.

Forever yours,
Your devoted heart 💕`

  const surpriseImages = ["/romantic-couple-sunset.png", "/couple-laughing.png", "/romantic-dinner.png"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl border-4 border-pink-200 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-40 falling-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 8 + 10}px`,
              }}
            >
              💖
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2 sparkle">💌</div>
            <h2 className="text-3xl font-bold text-primary glow-text mb-2">A Letter From My Heart</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 shadow-inner border border-pink-200">
            <pre className="font-handwritten text-primary whitespace-pre-wrap text-center leading-relaxed text-xl">
              {poem}
            </pre>
          </div>

          <div className="flex gap-4 justify-center mb-4">
            
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white/80 hover:bg-white border-pink-200 font-semibold py-2 px-6 rounded-full romantic-transition"
            >
              Close 💕
            </Button>
          </div>

          {showSurprise && (
            <div className="mt-6 fade-in-up">
              <h3 className="text-xl font-bold text-primary text-center mb-4 glow-text">Our Beautiful Memories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {surpriseImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 romantic-transition"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
                  </div>
                ))}
              </div>
              <p className="text-center text-primary font-semibold mt-4 italic font-handwritten text-lg">
                "Every picture tells our love story 📸💕"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
