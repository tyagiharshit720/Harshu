"use client"

import { useState, useEffect } from "react"
import LoginPage from "@/components/login-page"
import Homepage from "@/components/homepage"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem("romanticSiteLogin")
    if (loginStatus === "true") {
      setIsLoggedIn(true)
    }

    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true)
      localStorage.setItem("romanticSiteLogin", "true")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("romanticSiteLogin")
  }

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center">
        <div className="text-center fade-in-up">
          <div className="text-6xl mb-4 heartbeat">💕</div>
          <h1 className="text-2xl font-bold text-primary glow-text">Welcome to Our Love Story</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Homepage onLogout={handleLogout} />}
    </div>
  )
}
