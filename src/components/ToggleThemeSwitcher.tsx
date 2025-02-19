"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ToggleThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className="relative w-14 h-8 bg-gray-200 dark:bg-gray-500 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full transition-transform flex items-center justify-center ${
          resolvedTheme === "dark" ? "transform translate-x-6" : ""
        }`}
      >
        {resolvedTheme === "dark" ? (
          <Sun size={16} className="text-yellow-500" />
        ) : (
          <Moon size={16} className="text-gray-800" />
        )}
      </div>
    </div>
  )
}