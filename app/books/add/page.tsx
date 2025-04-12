"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getUserFromStorage, requireOwner } from "@/lib/auth"
import { createBook } from "@/lib/data"

export default function AddBookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
    imageUrl: "", // Add image URL field
  })
  const [error, setError] = useState("")

  useEffect(() => {
    requireOwner(() => {
      const user = getUserFromStorage()

      if (user) {
        // Pre-fill contact info
        setFormData((prev) => ({
          ...prev,
          contact: user.mobile,
        }))
      }
    })
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = getUserFromStorage()
    if (!user) {
      router.push("/auth/login")
      return
    }

    // Basic validation
    if (!formData.title || !formData.author || !formData.location || !formData.contact) {
      setError("Title, author, location, and contact are required")
      return
    }

    // Create book
    createBook({
      title: formData.title,
      author: formData.author,
      genre: formData.genre || undefined,
      location: formData.location,
      contact: formData.contact,
      ownerId: user.id,
      ownerName: user.name,
      isAvailable: true,
      imageUrl: formData.imageUrl || "https://via.placeholder.com/200x300?text=No+Cover", // Use placeholder if no image URL
    })

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Book</CardTitle>
          <CardDescription>Share a book you want to give away or rent</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the book title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                placeholder="Enter the author's name"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre (Optional)</Label>
              <Input
                id="genre"
                name="genre"
                placeholder="E.g., Fiction, Science, History"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Book Cover Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/book-cover.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL to an image of the book cover. Leave empty to use a placeholder.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                placeholder="City, Area, or Neighborhood"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information *</Label>
              <Textarea
                id="contact"
                name="contact"
                placeholder="Phone number or preferred contact method"
                value={formData.contact}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">This will be visible to users interested in your book</p>
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Add Book</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
