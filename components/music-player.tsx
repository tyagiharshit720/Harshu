"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // You can replace this with your own romantic music file
  const musicUrl = "/placeholder.mp3?query=soft romantic instrumental music"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.3 // Set to 30% volume
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-pink-200">
      <audio ref={audioRef} src={musicUrl} />

      <div className="flex items-center space-x-2">
        <Button onClick={togglePlay} variant="ghost" size="sm" className="rounded-full hover:bg-pink-100">
          {isPlaying ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        </Button>

        <Button onClick={toggleMute} variant="ghost" size="sm" className="rounded-full hover:bg-pink-100">
          {isMuted ? <VolumeX className="h-4 w-4 text-primary" /> : <Volume2 className="h-4 w-4 text-primary" />}
        </Button>

        <span className="text-xs text-primary font-medium px-2">🎵 Our Song</span>
      </div>
    </div>
  )
}
