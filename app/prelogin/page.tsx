"use client"

import Link from "next/link"
import { Shield, UserPlus, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { startGuestSession } from "@/hooks/use-guest"

export default function PreloginPage() {
  const router = useRouter()

  const handleContinueGuest = () => {
    // Start guest session (default duration) and redirect home
    startGuestSession()
    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-lg border-2 border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-6">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900">
              <Shield className="text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Welcome Back</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">For security and personalized recommendations we require signing in. Choose how you'd like to continue.</p>

              <div className="mt-6 flex gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold">
                  <LogIn />
                  Sign In
                </Link>

                <Link href="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 font-medium">
                  <UserPlus />
                  Create Account
                </Link>

                <button onClick={handleContinueGuest} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 dark:bg-slate-700 font-medium">
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
