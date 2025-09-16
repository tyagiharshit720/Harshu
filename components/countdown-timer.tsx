"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
  title: string
}

export default function CountdownTimer({ targetDate, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 fade-in-up">
      <h3 className="text-xl font-semibold text-center mb-4 text-primary">{title}</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-lg p-3">
          <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Days</div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-lg p-3">
          <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Hours</div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-lg p-3">
          <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-lg p-3">
          <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
          <div className="text-sm text-muted-foreground">Seconds</div>
        </div>
      </div>
    </div>
  )
}
