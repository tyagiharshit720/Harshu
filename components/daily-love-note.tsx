"use client"

import { useState, useEffect } from "react"

const loveNotes = [
  "Every morning I wake up grateful for you in my life ☀️",
  "Your smile is the most beautiful thing I've ever seen 😊",
  "I fall in love with you more every single day 💕",
  "You make even ordinary moments feel magical ✨",
  "Thank you for being my best friend and soulmate 👫",
  "Your laugh is my favorite sound in the world 🎵",
  "I love how you make me feel like the luckiest person alive 🍀",
]

export default function DailyLoveNote() {
  const [currentNote, setCurrentNote] = useState("")

  useEffect(() => {
    // Get today's date and use it to select a consistent note for the day
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
    )
    const noteIndex = dayOfYear % loveNotes.length
    setCurrentNote(loveNotes[noteIndex])
  }, [])

  return (
    <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 shadow-lg border border-pink-200 fade-in-up">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-primary mb-4">Today's Love Note 💌</h3>
        <div className="text-4xl mb-4">💝</div>
        <p className="text-lg text-gray-700 italic font-handwritten leading-relaxed">"{currentNote}"</p>
        <div className="mt-4 text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}
