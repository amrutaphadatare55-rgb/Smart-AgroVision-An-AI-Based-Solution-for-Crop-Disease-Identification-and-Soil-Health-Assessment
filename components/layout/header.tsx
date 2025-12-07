"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { AgroVisionLogo } from "@/components/logo"
import GuestExpiryModal from "@/components/auth/guest-expiry-modal"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Avoid reading localStorage during render to prevent SSR/client markup mismatch.
  const [isMounted, setIsMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    try {
      const tok = localStorage.getItem("token")
      setIsLoggedIn(!!tok)
    } catch (e) {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition">
            <AgroVisionLogo size={40} showText={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
              How It Works
            </Link>
            <div className="flex gap-3">
              {isMounted && isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition flex items-center gap-2 font-medium"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/prelogin"
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 pt-4 animate-in fade-in slide-in-from-top-2">
            <Link href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600">
              How It Works
            </Link>
            {isMounted && isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-left font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/prelogin" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 font-medium">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        )}
        {/* Guest expiry modal (renders if a guest session expired) */}
        <GuestExpiryModal />
      </div>
    </header>
  )
}
