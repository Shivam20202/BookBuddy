"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Book, User } from "@/lib/types"
import { getUserFromStorage, requireAuth } from "@/lib/auth"
import { getBooksByOwnerId, updateBookAvailability, deleteBook } from "@/lib/data"
import Link from "next/link"
import { BookOpen, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    requireAuth(() => {
      const currentUser = getUserFromStorage()

      if (currentUser) {
        setUser(currentUser)

        if (currentUser.role === "owner") {
          const userBooks = getBooksByOwnerId(currentUser.id)
          setBooks(userBooks)
        }
      }
    })
  }, [router])

  const handleToggleAvailability = (bookId: string, currentStatus: boolean) => {
    const updatedBook = updateBookAvailability(bookId, !currentStatus)

    if (updatedBook) {
      setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? updatedBook : book)))
    }
  }

  const handleDeleteBook = (bookId: string) => {
    const success = deleteBook(bookId)

    if (success) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
    }
  }

  const handleImageError = (bookId: string) => {
    setImageErrors((prev) => ({ ...prev, [bookId]: true }))
  }

  const getImageUrl = (book: Book) => {
    if (imageErrors[book.id]) {
      return "/placeholder.svg?height=300&width=200"
    }
    return book.imageUrl || "/placeholder.svg?height=300&width=200"
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {user.role === "owner" && (
          <Button asChild>
            <Link href="/books/add">
              <Plus className="mr-2 h-4 w-4" /> Add New Book
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Name:</div>
              <div className="text-sm">{user.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Email:</div>
              <div className="text-sm">{user.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Mobile:</div>
              <div className="text-sm">{user.mobile}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-sm font-medium">Role:</div>
              <div className="text-sm capitalize">{user.role}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {user.role === "owner" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Books</h2>

          {books.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No books listed yet</h3>
                  <p className="text-muted-foreground mt-2">
                    Start sharing your books with others by adding your first book.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/books/add">
                      <Plus className="mr-2 h-4 w-4" /> Add Your First Book
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="relative w-full h-[300px] bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={getImageUrl(book) || "/placeholder.svg"}
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        onError={() => handleImageError(book.id)}
                        priority={true}
                      />
                    </div>
                    <Badge variant={book.isAvailable ? "default" : "secondary"} className="absolute top-2 right-2 z-10">
                      {book.isAvailable ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                    </div>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-1">
                      {book.genre && (
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Genre:</div>
                          <div className="text-sm">{book.genre}</div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Location:</div>
                        <div className="text-sm">{book.location}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Contact:</div>
                        <div className="text-sm">{book.contact}</div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAvailability(book.id, book.isAvailable)}
                      >
                        Mark as {book.isAvailable ? "Not Available" : "Available"}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteBook(book.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {user.role === "seeker" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Find Books to Borrow</h3>
              <p className="text-muted-foreground mt-2">Browse available books from owners in your area.</p>
              <Button asChild className="mt-4">
                <Link href="/books">Browse Available Books</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
