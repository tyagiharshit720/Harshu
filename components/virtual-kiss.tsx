"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VirtualKiss() {
  const [showKiss, setShowKiss] = useState(false)
  const [kissCount, setKissCount] = useState(0)

  const handleKiss = () => {
    setShowKiss(true)
    setKissCount((prev) => prev + 1)

    setTimeout(() => {
      setShowKiss(false)
    }, 2000)
  }

  return (
    <div className="text-center p-6 bg-white/50 rounded-3xl backdrop-blur-sm border border-pink-200">
      <h3 className="text-2xl font-bold text-pink-600 mb-4">Send Me a Kiss 💋</h3>
      <div className="relative mb-4">
        <Button
          onClick={handleKiss}
          className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-full text-lg transition-all duration-300 hover:scale-110 shadow-lg"
        >
          💋 Kiss Me
        </Button>
        {showKiss && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">💋</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-pink-500 font-bold animate-pulse">
              *MWAH*
            </div>
          </div>
        )}
      </div>
      <p className="text-pink-600">Kisses sent: {kissCount} 💕</p>
    </div>
  )
}
