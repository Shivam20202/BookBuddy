import type { Book, User } from "./types"

// In-memory storage
let users: User[] = []
let books: Book[] = []

// Sample books data with reliable image URLs
const sampleBooks: Omit<Book, "id" | "createdAt">[] = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    location: "New York",
    contact: "john@example.com / 555-1234",
    ownerId: "sample1",
    ownerName: "John Doe",
    isAvailable: true,
    imageUrl: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    location: "San Francisco",
    contact: "jane@example.com / 555-5678",
    ownerId: "sample2",
    ownerName: "Jane Smith",
    isAvailable: false,
    imageUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    location: "Chicago",
    contact: "mike@example.com / 555-9012",
    ownerId: "sample3",
    ownerName: "Mike Johnson",
    isAvailable: true,
    imageUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    location: "Boston",
    contact: "sarah@example.com / 555-3456",
    ownerId: "sample4",
    ownerName: "Sarah Williams",
    isAvailable: true,
    imageUrl: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    location: "Seattle",
    contact: "david@example.com / 555-7890",
    ownerId: "sample5",
    ownerName: "David Brown",
    isAvailable: false,
    imageUrl: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
  },
]

// Initialize sample data
const initializeSampleData = () => {
  // Only add sample books if there are none
  if (books.length === 0) {
    sampleBooks.forEach((book) => {
      createBook(book)
    })
  }
}

// Load initial data from localStorage if available (client-side only)
if (typeof window !== "undefined") {
  const storedUsers = localStorage.getItem("users")
  const storedBooks = localStorage.getItem("books")

  if (storedUsers) {
    users = JSON.parse(storedUsers)
  }

  if (storedBooks) {
    books = JSON.parse(storedBooks)
  } else {
    // Initialize with sample books if no books exist
    sampleBooks.forEach((book) => {
      const newBook = {
        ...book,
        id: `sample-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }
      books.push(newBook)
    })
    saveBooks()
  }
}

// User operations
export const createUser = (user: Omit<User, "id">): User => {
  const newUser = {
    ...user,
    id: Date.now().toString(),
  }

  users.push(newUser)
  saveUsers()

  return newUser
}

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email)
}

export const getAllUsers = (): User[] => {
  return [...users]
}

// Book operations
export const createBook = (book: Omit<Book, "id" | "createdAt">): Book => {
  const newBook = {
    ...book,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  books.push(newBook)
  saveBooks()

  return newBook
}

export const getAllBooks = (): Book[] => {
  return [...books]
}

export const getBookById = (id: string): Book | undefined => {
  return books.find((book) => book.id === id)
}

export const getBooksByOwnerId = (ownerId: string): Book[] => {
  return books.filter((book) => book.ownerId === ownerId)
}

export const updateBookAvailability = (id: string, isAvailable: boolean): Book | undefined => {
  const bookIndex = books.findIndex((book) => book.id === id)

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      isAvailable,
    }

    saveBooks()
    return books[bookIndex]
  }

  return undefined
}

export const deleteBook = (id: string): boolean => {
  const initialLength = books.length
  books = books.filter((book) => book.id !== id)

  if (books.length !== initialLength) {
    saveBooks()
    return true
  }

  return false
}

// Helper functions to persist data
function saveUsers() {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users))
  }
}

function saveBooks() {
  if (typeof window !== "undefined") {
    localStorage.setItem("books", JSON.stringify(books))
  }
}

// Export the initialize function
export { initializeSampleData }
