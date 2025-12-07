"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Loader } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // Mock registration
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
      }

      const token = "mock_token_" + Math.random().toString(36).substr(2, 9)

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
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
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-color-muted">Join Smart AgroVision today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="text-center text-sm text-color-muted">
              Already have an account?{" "}
              <Link href="/prelogin" className="text-color-primary hover:text-color-primary-light transition">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
