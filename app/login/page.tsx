"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Loader } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${baseUrl}/auth/login?email=${formData.email}&password=${formData.password}`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Invalid email or password")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_id", data.user_id)

      if (data.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Make sure backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickTest = async () => {
    setError("")
    setIsLoading(true)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      
      // First, initialize the database with test user
      const initRes = await fetch(`${baseUrl}/init`)
      const initData = await initRes.json()
      
      if (initData.test_user_token) {
        localStorage.setItem("token", initData.test_user_token)
        localStorage.setItem("user_id", initData.user_id)
        router.push("/dashboard")
      } else {
        throw new Error("Could not create test account")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Test account setup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-color-background via-color-background to-color-muted-bg flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-md">
          <div className="bg-color-card border border-color-border rounded-xl p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-color-muted">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-color-error/20 border border-color-error text-color-error text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-color-primary to-color-primary-dark text-color-background font-semibold hover:shadow-lg hover:shadow-color-primary/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader size={16} className="animate-spin" />}
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="text-center text-sm text-color-muted">
              Don't have an account?{" "}
              <Link href="/register" className="text-color-primary hover:text-color-primary-light transition">
                Sign up
              </Link>
            </div>

            <div className="pt-4 border-t border-color-border">
              <button
                type="button"
                onClick={handleQuickTest}
                disabled={isLoading}
                className="w-full py-2 rounded-lg bg-slate-600 text-color-background font-semibold hover:bg-slate-700 transition disabled:opacity-50"
              >
                {isLoading ? "Setting up..." : "🚀 Quick Test Account"}
              </button>
              <p className="text-center text-xs text-color-muted mt-2">
                Auto-creates test account with test@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
