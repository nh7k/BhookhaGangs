"use client"

import { useState, useCallback } from "react"
import type { User } from "./use-recipe-store"
import { useRecipeStore } from "./use-recipe-store"

export function useAuth() {
  const { currentUser, saveCurrentUser } = useRecipeStore()
  const [error, setError] = useState<string | null>(null)

  const signup = useCallback(
    (email: string, password: string, name: string) => {
      setError(null)

      if (!email || !password || !name) {
        setError("All fields are required")
        return false
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        name,
        bio: "",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        recipes: [],
        savedRecipes: [],
        followers: [],
        following: [],
        joinedAt: new Date().toISOString(),
      }

      saveCurrentUser(newUser)
      return true
    },
    [saveCurrentUser],
  )

  const login = useCallback(
    (email: string, password: string) => {
      setError(null)

      if (!email || !password) {
        setError("Email and password are required")
        return false
      }

      // Create user instantly with any credentials - demo mode
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        name: email.split("@")[0],
        bio: "",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        recipes: [],
        savedRecipes: [],
        followers: [],
        following: [],
        joinedAt: new Date().toISOString(),
      }

      saveCurrentUser(user)
      console.log("[v0] User logged in:", user.email)
      return true
    },
    [saveCurrentUser],
  )

  const logout = useCallback(() => {
    saveCurrentUser(null)
  }, [saveCurrentUser])

  return { currentUser, error, signup, login, logout }
}
