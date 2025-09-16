"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loginUser } from "../api"

interface LoginPageProps {
  onLogin: (success: boolean) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await loginUser({ username, password })

    if (result.success) {
      localStorage.setItem("token", result.token!)
      onLogin(true)
    } else {
      setError(result.message || "Login failed")
      setTimeout(() => setError(""), 5000)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-pink-200 fade-in-up">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-primary glow-text">Welcome, My Love</CardTitle>
          <p className="text-muted-foreground text-sm">Enter your details to see something special</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your beautiful name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Our secret phrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Connecting..." : "Enter Our World 💖"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
