"use client"

import { useState, useEffect } from "react"

const sweetMessages = [
  "You make my heart skip a beat 💓",
  "Every moment with you is magical ✨",
  "You're my favorite notification 📱💕",
  "I love you more than coffee ☕❤️",
  "You're my happy place 🏠💖",
  "Distance means nothing when you mean everything 🌍💕",
  "You're the reason I smile 😊💗",
  "My heart belongs to you forever 💝",
  "You're my sunshine on cloudy days ☀️💛",
  "I choose you, always and forever 💍💕",
]

export default function LoveMessages() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const showRandomMessage = () => {
      setIsTyping(true)
      const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)]

      setTimeout(() => {
        setCurrentMessage(randomMessage)
        setIsTyping(false)
      }, 1000)
    }

    showRandomMessage()
    const interval = setInterval(showRandomMessage, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 max-w-xs p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-lg love-glow z-50">
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse mr-2"></div>
        <span className="text-sm font-medium text-pink-600">Love Message</span>
      </div>
      <p className="text-sm text-pink-700">
        {isTyping ? <span className="animate-pulse">Typing... 💭</span> : currentMessage}
      </p>
    </div>
  )
}
