import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Users, Search } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to BookBuddy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with others to exchange, rent, and share books in your community
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/auth/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 py-8">
        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>List Your Books</CardTitle>
            <CardDescription>Share books you no longer need with others</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              As a Book Owner, you can list books you want to give away or rent out. Help others discover great reads
              while decluttering your shelves.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/register?role=owner">Register as Owner</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Search className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Find Books</CardTitle>
            <CardDescription>Discover books available in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              As a Book Seeker, browse through available books in your area. Find that book you've been wanting to read
              without having to buy it.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/register?role=seeker">Register as Seeker</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Connect</CardTitle>
            <CardDescription>Build a community of book lovers</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Connect with fellow book enthusiasts in your area. Exchange books, share recommendations, and make new
              friends.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/books">Browse Available Books</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
