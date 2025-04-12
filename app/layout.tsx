import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookBuddy - Peer-to-Peer Book Exchange",
  description: "Connect with others to exchange and rent books",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto py-6 px-4">{children}</main>
            <footer className="border-t py-4">
              <div className="container mx-auto text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} BookBuddy - Peer-to-Peer Book Exchange
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'