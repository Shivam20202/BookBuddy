"use client"

import type { User } from "./types"
import { getUserByEmail } from "./data"

// Authentication functions
export const login = (email: string, password: string): User | null => {
  const user = getUserByEmail(email)

  if (user && user.password === password) {
    // Store user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  }

  return null
}

export const logout = (): void => {
  localStorage.removeItem("currentUser")

  // Redirect to homepage after logout
  if (typeof window !== "undefined") {
    window.location.href = "/"
  }
}

export const getUserFromStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const userJson = localStorage.getItem("currentUser")

    if (userJson) {
      return JSON.parse(userJson)
    }
  }

  return null
}

export const isAuthenticated = (): boolean => {
  return getUserFromStorage() !== null
}

export const isOwner = (): boolean => {
  const user = getUserFromStorage()
  return user !== null && user.role === "owner"
}

export const isSeeker = (): boolean => {
  const user = getUserFromStorage()
  return user !== null && user.role === "seeker"
}

// Route protection
export const requireAuth = (callback: () => void): void => {
  if (!isAuthenticated() && typeof window !== "undefined") {
    window.location.href = "/auth/login"
  } else {
    callback()
  }
}

export const requireOwner = (callback: () => void): void => {
  if (!isAuthenticated() && typeof window !== "undefined") {
    window.location.href = "/auth/login"
  } else if (!isOwner() && typeof window !== "undefined") {
    window.location.href = "/dashboard"
  } else {
    callback()
  }
}
