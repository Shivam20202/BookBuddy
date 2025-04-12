"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Book } from "@/lib/types"
import { getAllBooks } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Image from "next/image"

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [showUnavailable, setShowUnavailable] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const allBooks = getAllBooks()
    setBooks(allBooks)
    setFilteredBooks(allBooks.filter((book) => showUnavailable || book.isAvailable))
  }, [showUnavailable])

  useEffect(() => {
    let results = books

    // Filter by availability unless showUnavailable is true
    if (!showUnavailable) {
      results = results.filter((book) => book.isAvailable)
    }

    if (searchTerm) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (locationFilter) {
      results = results.filter((book) => book.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    setFilteredBooks(results)
  }, [searchTerm, locationFilter, books, showUnavailable])

  const handleImageError = (bookId: string) => {
    setImageErrors((prev) => ({ ...prev, [bookId]: true }))
  }

  const getImageUrl = (book: Book) => {
    if (imageErrors[book.id]) {
      return "/placeholder.svg?height=300&width=200"
    }
    return book.imageUrl || "/placeholder.svg?height=300&width=200"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Books</h1>
        <p className="text-muted-foreground mt-2">Discover books available for exchange or rent</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="search">Search by Title, Author or Genre</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search books..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Filter by Location</Label>
          <Input
            id="location"
            placeholder="Enter city or area..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showUnavailable"
              checked={showUnavailable}
              onChange={(e) => setShowUnavailable(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="showUnavailable" className="text-sm font-medium">
              Show unavailable books
            </Label>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No books found</h3>
              <p className="text-muted-foreground mt-2">
                {books.length === 0
                  ? "There are no books available at the moment. Check back later!"
                  : "Try adjusting your search filters to find more books."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col h-full">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge variant={book.isAvailable ? "default" : "secondary"} className="absolute top-2 right-2 z-10">
                  {book.isAvailable ? "Available" : "Rented/Reserved"}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription className="mt-1">{book.author}</CardDescription>
                  </div>
                  {book.genre && <Badge variant="outline">{book.genre}</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="grid grid-cols-[100px_1fr] gap-1">
                    <div className="text-sm font-medium">Owner:</div>
                    <div className="text-sm">{book.ownerName}</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-1">
                    <div className="text-sm font-medium">Location:</div>
                    <div className="text-sm">{book.location}</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-1">
                    <div className="text-sm font-medium">Contact:</div>
                    <div className="text-sm">{book.contact}</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-1">
                    <div className="text-sm font-medium">Status:</div>
                    <div className="text-sm font-semibold">
                      {book.isAvailable ? (
                        <span className="text-green-600">Available for exchange/rent</span>
                      ) : (
                        <span className="text-amber-600">Currently rented or reserved</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
