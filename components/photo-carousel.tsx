"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Placeholder images - you can replace these with your actual photos
  const photos = [
    {
      src: "/us/img1.jpg",
      alt: "Our beautiful sunset moment",
      caption: "That magical evening we watched the sunset together 🌅",
    },
    {
      src: "/us/img3.jpg",
      alt: "Laughing together",
      caption: "You always make me laugh like no one else can 😄",
    },
    {
      src: "/us/img2.jpg",
      alt: "Our romantic dinner",
      caption: "Our first dinner date - I knew you were special ❤️",
    },
    {
      src: "/us/img4.jpg",
      alt: "Walking together",
      caption: "Every step with you is an adventure 👫",
    },
    {
      src: "/us/img5.jpg",
      alt: "Our embrace",
      caption: "In your arms, I found my home 🏠",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [photos.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-200">
      {/* Main Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
  src={photos[currentIndex].src || "/placeholder.svg"}
  alt={photos[currentIndex].alt}
  className="transition-all duration-500 hover:scale-105"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain", // keeps full image visible
    borderRadius: "12px", // keeps rounded look
  }}
/>


        {/* Navigation Buttons */}
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={goToNext}
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Caption */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50">
        <p className="text-center text-muted-foreground font-medium">{photos[currentIndex].caption}</p>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 p-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary scale-125" : "bg-pink-200 hover:bg-pink-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
