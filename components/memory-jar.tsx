"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Memory {
  id: number
  text: string
  date: string
  color: string
}

export default function MemoryJar() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [newMemory, setNewMemory] = useState("")
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const colors = ["bg-pink-200", "bg-red-200", "bg-purple-200", "bg-blue-200", "bg-yellow-200"]

  const preloadedMemories = [
    "Our first kiss under the starlight 💫",
    "The way you laugh at my silly jokes 😄",
    "Laughings in the kitchen while cooking together 💃",
    "Your sleepy smile in the morning ☀️",
    "How you hold my hand during walk 🎬",
  ]

  useEffect(() => {
    const initialMemories = preloadedMemories.map((memory, index) => ({
      id: index,
      text: memory,
      date: new Date().toLocaleDateString(),
      color: colors[index % colors.length],
    }))
    setMemories(initialMemories)
  }, [])

  const addMemory = () => {
    if (newMemory.trim()) {
      const memory: Memory = {
        id: Date.now(),
        text: newMemory,
        date: new Date().toLocaleDateString(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setMemories((prev) => [...prev, memory])
      setNewMemory("")
    }
  }

  const pickRandomMemory = () => {
    const randomMemory = memories[Math.floor(Math.random() * memories.length)]
    setSelectedMemory(randomMemory)
  }

  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-800 text-center mb-4">Our Memory Jar 🏺</h3>
      <p className="text-amber-700 text-center mb-6 text-sm">Collect beautiful moments and pick one to relive</p>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <Input
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            placeholder="Add a beautiful memory..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && addMemory()}
          />
          <Button onClick={addMemory} className="bg-amber-500 hover:bg-amber-600">
            Add
          </Button>
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🏺</div>
          <div className="text-amber-700 text-sm">{memories.length} precious memories collected</div>
        </div>

        <Button onClick={pickRandomMemory} className="w-full bg-amber-500 hover:bg-amber-600 text-white mb-4">
          Pick a Random Memory ✨
        </Button>

        {selectedMemory && (
          <div className={`${selectedMemory.color} rounded-lg p-4 fade-in-up`}>
            <div className="text-amber-800 font-medium mb-2">{selectedMemory.text}</div>
            <div className="text-amber-600 text-xs">Added on {selectedMemory.date}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
        {memories.slice(-6).map((memory) => (
          <div
            key={memory.id}
            className={`${memory.color} rounded-lg p-2 text-xs text-amber-800 cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => setSelectedMemory(memory)}
          >
            {memory.text.substring(0, 30)}...
          </div>
        ))}
      </div>
    </div>
  )
}
