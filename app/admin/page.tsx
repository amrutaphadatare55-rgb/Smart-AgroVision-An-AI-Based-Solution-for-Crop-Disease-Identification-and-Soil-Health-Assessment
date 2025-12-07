"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdminTabs } from "@/components/admin/admin-tabs"
import { AlertCircle } from "lucide-react"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token) {
      router.push("/login")
    } else if (user) {
      const userData = JSON.parse(user)
      if (userData.role === "admin") {
        setIsAdmin(true)
        setIsLoggedIn(true)
      } else {
        router.push("/dashboard")
      }
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-color-background via-color-background to-color-muted-bg flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 mx-auto text-color-error" />
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-color-muted">You don't have permission to access the admin panel.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-color-background via-color-background to-color-muted-bg flex flex-col">
      <Header />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-color-muted">Manage crops, diseases, treatments, and users</p>
        </div>
        <AdminTabs />
      </div>
      <Footer />
    </main>
  )
}
