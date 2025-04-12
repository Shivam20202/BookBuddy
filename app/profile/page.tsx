"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { requireAuth } from "@/lib/auth"

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    requireAuth(() => {
      // Redirect to dashboard which has the profile information
      router.push("/dashboard")
    })
  }, [router])

  return <div>Redirecting to dashboard...</div>
}
