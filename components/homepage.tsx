"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PhotoCarousel from "@/components/photo-carousel"
import HeartShower from "@/components/heart-shower"
import MusicPlayer from "@/components/music-player"
import TimelineOfUs from "@/components/timeline-of-us"
import LoveLetter from "@/components/love-letter"
import CountdownTimer from "@/components/countdown-timer"
import LoveQuiz from "@/components/love-quiz"
import DailyLoveNote from "@/components/daily-love-note"
import InteractiveHeart from "@/components/interactive-heart"
import VirtualKiss from "@/components/virtual-kiss"
import ReasonsILoveYou from "@/components/reasons-i-love-you"
import LoveMeter from "@/components/love-meter"
import CuteAnimations from "@/components/cute-animations"
import LoveMessages from "@/components/love-messages"
import FloatingElements from "@/components/floating-elements"
import LoveConstellation from "@/components/love-constellation"
import VirtualGarden from "@/components/virtual-garden"
import LoveFortune from "@/components/love-fortune"
import MemoryJar from "@/components/memory-jar"

interface HomepageProps {
  onLogout: () => void
}

export default function Homepage({ onLogout }: HomepageProps) {
  const [showGift, setShowGift] = useState(false)
  const [showHeartShower, setShowHeartShower] = useState(false)
  const [activeSection, setActiveSection] = useState<
    | "timeline"
    | "quiz"
    | "countdown"
    | "heart"
    | "kiss"
    | "reasons"
    | "meter"
    | "animations"
    | "constellation"
    | "garden"
    | "fortune"
    | "memory"
  >("timeline")

  const handleGiftClick = () => {
    setShowGift(true)
    setShowHeartShower(true)

    // Stop heart shower after 10 seconds
    setTimeout(() => {
      setShowHeartShower(false)
    }, 10000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 relative overflow-hidden">
      {/* Music Player */}
      <MusicPlayer />

      {/* Heart Shower Effect */}
      {showHeartShower && <HeartShower />}

      {/* Floating Elements and Love Messages */}
      <FloatingElements />
      <LoveMessages />

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white border-pink-200 romantic-hover"
      >
        Logout
      </Button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 glow-text gentle-bounce">Hi My Love ❤️</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Welcome to our magical love sanctuary, where every click brings us closer 💕
          </p>
        </div>

        {/* Daily Love Note */}
        <div className="mb-8 max-w-2xl mx-auto">
          <DailyLoveNote />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            onClick={() => setActiveSection("timeline")}
            variant={activeSection === "timeline" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            📅 Timeline
          </Button>
          <Button
            onClick={() => setActiveSection("quiz")}
            variant={activeSection === "quiz" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            🧠 Quiz
          </Button>
          <Button
            onClick={() => setActiveSection("countdown")}
            variant={activeSection === "countdown" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            ⏰ Countdown
          </Button>
          <Button
            onClick={() => setActiveSection("heart")}
            variant={activeSection === "heart" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            💖 Heart
          </Button>
          <Button
            onClick={() => setActiveSection("kiss")}
            variant={activeSection === "kiss" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            💋 Kiss
          </Button>
          <Button
            onClick={() => setActiveSection("reasons")}
            variant={activeSection === "reasons" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            💕 Reasons
          </Button>
          <Button
            onClick={() => setActiveSection("meter")}
            variant={activeSection === "meter" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            📊 Love Meter
          </Button>
          {/* <Button
            onClick={() => setActiveSection("animations")}
            variant={activeSection === "animations" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            ✨ Animations
          </Button> */}
          <Button
            onClick={() => setActiveSection("constellation")}
            variant={activeSection === "constellation" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            🌌 Stars
          </Button>
          <Button
            onClick={() => setActiveSection("garden")}
            variant={activeSection === "garden" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            🌺 Garden
          </Button>
          <Button
            onClick={() => setActiveSection("fortune")}
            variant={activeSection === "fortune" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            🔮 Fortune
          </Button>
          <Button
            onClick={() => setActiveSection("memory")}
            variant={activeSection === "memory" ? "default" : "outline"}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-sm romantic-hover"
          >
            🏺 Memories
          </Button>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          {activeSection === "timeline" && <TimelineOfUs />}
          {activeSection === "quiz" && <LoveQuiz />}
          {activeSection === "countdown" && (
            <CountdownTimer targetDate="2024-12-31" title="Days Until Our Next Adventure" />
          )}
          {activeSection === "heart" && <InteractiveHeart />}
          {activeSection === "kiss" && <VirtualKiss />}
          {activeSection === "reasons" && <ReasonsILoveYou />}
          {activeSection === "meter" && <LoveMeter />}
          {activeSection === "animations" && <CuteAnimations />}
          {activeSection === "constellation" && <LoveConstellation />}
          {activeSection === "garden" && <VirtualGarden />}
          {activeSection === "fortune" && <LoveFortune />}
          {activeSection === "memory" && <MemoryJar />}
        </div>

        {/* Photo Carousel */}
        <div className="w-full max-w-2xl mx-auto mb-12 fade-in-up">
          <PhotoCarousel />
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={handleGiftClick}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg love-glow"
          >
            Open Your Gift 🎁
          </Button>
        </div>

        {showGift && <LoveLetter onClose={() => setShowGift(false)} />}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-40 float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 12}px`,
              }}
            >
              {["💖", "💕", "💗", "💝", "🌹", "✨"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
