"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  // Use theme from localStorage if available or set light theme as default
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme")
    }
    // Check user preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  })

  // Update theme when toggled
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme as string)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out transform"
        style={{
          opacity: theme === "light" ? 1 : 0,
          transform: theme === "light" ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out transform"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transform: theme === "dark" ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </span>
    </Button>
  )
}

