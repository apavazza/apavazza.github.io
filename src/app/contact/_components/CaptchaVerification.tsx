"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface CaptchaVerificationProps {
  onVerify: () => void
}

export default function CaptchaVerification({ onVerify }: CaptchaVerificationProps) {
  const [captchaText, setCaptchaText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateCaptcha = () => {
    const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "bold 28px Arial"
        ctx.fillStyle = "#1e40af"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"

        // Add some noise
        for (let i = 0; i < 50; i++) {
          ctx.fillStyle = `rgba(0, 0, 0, 0.1)`
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
        }

        // Draw text with improved visibility
        ctx.strokeStyle = "#f3f4f6"
        ctx.lineWidth = 2
        for (let i = 0; i < text.length; i++) {
          ctx.save()
          ctx.translate(20 + i * 28, 30)
          ctx.rotate((Math.random() - 0.5) * 0.3)
          ctx.strokeText(text[i], 0, 0)
          ctx.fillText(text[i], 0, 0)
          ctx.restore()
        }
      }
    }
  }

  useEffect(() => {
    const newCaptcha = generateCaptcha()
    setCaptchaText(newCaptcha)
    drawCaptcha(newCaptcha)
  }, []) // Added dependency array to fix the warning

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanedUserInput = userInput.replace(/\s/g, "")
    if (cleanedUserInput === captchaText) {
      onVerify()
    } else {
      setError("Captcha does not match")
      setUserInput("")
      const newCaptcha = generateCaptcha()
      setCaptchaText(newCaptcha)
      drawCaptcha(newCaptcha)
    }
  }

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha()
    setCaptchaText(newCaptcha)
    drawCaptcha(newCaptcha)
    setUserInput("")
    setError("")
  }

  return (
    <div className="bg-white dark:bg-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-brand-primary mb-6 text-center leading-tight">
        Verify to View
        <br />
        Contact Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={200}
            height={60}
            className="border-2 border-brand-primary rounded shadow-inner bg-gray-50"
          />
        </div>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors border border-gray-300"
        >
          Refresh Captcha
        </button>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter captcha (case sensitive)"
          className="w-full p-2 border-2 border-gray-300 dark:border-gray-200 rounded text-gray-800 placeholder:text-gray-500 bg-gray-100 dark:bg-gray-100 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-2 px-4 rounded hover:bg-brand-secondary active:bg-brand-tertiary transition-colors font-semibold"
        >
          Verify
        </button>
      </form>
    </div>
  )
}