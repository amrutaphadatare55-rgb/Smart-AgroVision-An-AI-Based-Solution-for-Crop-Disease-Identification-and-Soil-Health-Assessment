"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Leaf, Droplets, ChevronRight, Lightbulb } from "lucide-react"
import { isGuestActive } from "@/hooks/use-guest"

export default function DetectPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const guest = isGuestActive()
    if (!token && !guest) {
      router.push("/prelogin")
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Choose Your Detection Type</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select whether you want to analyze crop health or soil quality. Each path is optimized for specific insights and recommendations.
          </p>
        </div>

        {/* Detection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Crop Detection */}
          <Link href="/detect/crop">
            <div className="group relative h-full cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-green-300 dark:border-green-700 hover:border-green-500 hover:shadow-2xl transition h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-4xl">
                    🌾
                  </div>
                  <ChevronRight size={28} className="text-green-600 dark:text-green-400 group-hover:translate-x-2 transition" />
                </div>

                <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">Crop Detection</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                  Identify crop varieties, detect diseases, assess severity, and get targeted treatment recommendations.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Crop type identification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Disease detection & severity</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recovery timeline</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Treatment options</span>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg transition">
                  Start Crop Analysis
                </button>
              </div>
            </div>
          </Link>

          {/* Soil Detection */}
          <Link href="/detect/soil">
            <div className="group relative h-full cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-500 hover:shadow-2xl transition h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl">
                    🌍
                  </div>
                  <ChevronRight size={28} className="text-amber-600 dark:text-amber-400 group-hover:translate-x-2 transition" />
                </div>

                <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">Soil Analysis</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                  Analyze soil type, fertility score, nutrient levels, and moisture content with detailed recommendations.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Soil type classification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">NPK nutrient analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Fertility & moisture levels</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Fertilizer recommendations</span>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-lg transition">
                  Start Soil Analysis
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700">
          <div className="flex gap-4">
            <Lightbulb size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">Need Help Choosing?</h3>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Choose Crop Detection</strong> if you want to identify plant diseases, assess plant health, and get treatment guidance. <strong>Choose Soil Analysis</strong> if you want to understand soil composition, nutrient levels, and fertility. You can run both analyses on different photos for a complete farm assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
