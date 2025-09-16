"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Flower {
  id: number
  type: string
  stage: number
  x: number
  y: number
  message: string
}

export default function VirtualGarden() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [wateringCan, setWateringCan] = useState(false)

  const flowerTypes = [
    { emoji: "🌹", message: "A rose for my beautiful love" },
    { emoji: "🌺", message: "Blooming with love for you" },
    { emoji: "🌻", message: "You're my sunshine" },
    { emoji: "🌷", message: "Elegant like you" },
    { emoji: "🌸", message: "Delicate and precious" },
    { emoji: "💐", message: "A bouquet of my feelings" },
  ]

  const plantFlower = () => {
    const newFlower: Flower = {
      id: Date.now(),
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)].emoji,
      stage: 0,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      message: flowerTypes[Math.floor(Math.random() * flowerTypes.length)].message,
    }
    setFlowers((prev) => [...prev, newFlower])
  }

  const waterFlower = (flowerId: number) => {
    setWateringCan(true)
    setTimeout(() => setWateringCan(false), 1000)

    setFlowers((prev) =>
      prev.map((flower) =>
        flower.id === flowerId && flower.stage < 3 ? { ...flower, stage: flower.stage + 1 } : flower,
      ),
    )
  }

  const getFlowerDisplay = (flower: Flower) => {
    switch (flower.stage) {
      case 0:
        return "🌱"
      case 1:
        return "🌿"
      case 2:
        return "🌹"
      case 3:
        return flower.type
      default:
        return "🌱"
    }
  }

  return (
    <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-6 min-h-96 relative">
      <h3 className="text-2xl font-bold text-green-800 text-center mb-4">Our Love Garden 🌺</h3>
      <p className="text-green-700 text-center mb-6 text-sm">Plant flowers and water them to watch our love grow</p>

      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={plantFlower} className="bg-green-500 hover:bg-green-600 text-white">
          🌱 Plant Flower
        </Button>
        <div className={`text-2xl transition-transform ${wateringCan ? "animate-bounce" : ""}`}>🚿</div>
      </div>

      <div className="relative h-64 bg-green-50 rounded-lg border-2 border-green-200">
        {flowers.map((flower) => (
          <div key={flower.id} className="absolute">
            <button
              onClick={() => waterFlower(flower.id)}
              className="text-2xl hover:scale-125 transition-transform cursor-pointer"
              style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
              title={flower.stage === 3 ? flower.message : "Water me to grow!"}
            >
              {getFlowerDisplay(flower)}
            </button>
            {flower.stage === 3 && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-lg p-2 text-xs text-green-800 whitespace-nowrap shadow-lg">
                {flower.message}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-green-700 text-sm">
        Flowers planted: {flowers.length} | Fully grown: {flowers.filter((f) => f.stage === 3).length}
      </div>
    </div>
  )
}
