"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const quizQuestions = [
  {
    question: "What was our first date?",
    options: ["Coffee shop", "Movie theater", "Park walk", "Restaurant"],
    correct: 3,
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
    correct: 3,
  },
  {
    question: "Where do we want to travel together?",
    options: ["Paris", "Kedarnath", "Jharkhand", "Everywhere"],
    correct: 3,
  },
]

export default function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  if (showResult) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 fade-in-up">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Quiz Complete!</h3>
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-lg mb-4">
            You scored {score} out of {quizQuestions.length}!
          </p>
          <p className="text-muted-foreground mb-6">
            {score === quizQuestions.length
              ? "Perfect! You know me so well ❤️"
              : "You're amazing, and I love you no matter what! 💕"}
          </p>
          <Button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500"
          >
            Play Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 fade-in-up">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm text-muted-foreground">Score: {score}</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-center mb-6 text-primary">{quizQuestions[currentQuestion].question}</h3>

      <div className="space-y-3">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left justify-start transition-all duration-300 ${
              selectedAnswer === index
                ? index === quizQuestions[currentQuestion].correct
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : "bg-red-500 hover:bg-red-500 text-white"
                : "bg-white hover:bg-pink-50 text-gray-700 border border-pink-200"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
