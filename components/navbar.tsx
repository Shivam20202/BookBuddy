"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { getUserFromStorage, logout } from "@/lib/auth"

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getUserFromStorage()
    setUser(currentUser)
  }, [pathname])

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <Link href={user ? "/dashboard" : "/"} className="text-xl font-bold">
            BookBuddy
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/books"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/books" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Browse Books
          </Link>
          {user && user.role === "owner" && (
            <Link
              href="/books/add"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/books/add" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Add Book
            </Link>
          )}
          {user && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm hidden md:inline-block">
                Hi, {user.name} ({user.role})
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
