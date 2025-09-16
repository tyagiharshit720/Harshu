"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginPageProps {
  onLogin: (success: boolean) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.NEXT_APP_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      onLogin(true);
    } else {
      setError(data.message || 'Login failed');
      setTimeout(() => setError(''), 3000);
    }
  } catch (err) {
    setError('Server error. Try again later.');
    setTimeout(() => setError(''), 3000);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-pink-200 fade-in-up">
        <CardHeader className="text-center pb-2">
          <div className="text-4xl mb-2 heartbeat">💕</div>
          <CardTitle className="text-2xl font-bold text-primary glow-text">Welcome, My Love</CardTitle>
          <p className="text-muted-foreground text-sm">Enter your details to see something special</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your beautiful name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white border-pink-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Our secret phrase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-pink-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">💖</span>
                Enter Our World
                <span className="text-xl">💖</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Hint: Username is your name, password is your nickname 😉</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}