"use client"

import Link from "next/link"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export function Hero() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect?.()
      if (rect) {
        setMouseX(e.clientX - rect.left)
        setMouseY(e.clientY - rect.top)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
      {/* Enhanced animated gradient blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-400 to-orange-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "4s" }}></div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="inline-block px-4 py-2 rounded-full border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <span className="text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                <Sparkles size={16} /> AI-Powered Agriculture
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-6xl md:text-7xl font-black leading-tight text-balance">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">Grow Smarter,</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Not Harder</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mt-6 leading-relaxed">
              Upload a photo of your crop or soil, and get AI-powered analysis in seconds. Detect diseases early, optimize nutrients, and make confident farming decisions backed by data.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/detect"
              className="group inline-flex items-center justify-center px-7 py-4 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition transform"
            >
              Start Free <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl border-2 border-green-500 text-green-600 dark:text-green-400 font-bold hover:bg-green-50 dark:hover:bg-green-950 transition"
            >
              <Zap size={20} className="mr-2" /> How it Works
            </Link>
          </div>

          {/* Feature highlights with animation */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition group cursor-pointer">
              <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition">94%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition group cursor-pointer">
              <div className="text-3xl font-bold text-cyan-600 group-hover:scale-110 transition">0.5s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analysis</div>
            </div>
            <div className="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition group cursor-pointer">
              <div className="text-3xl font-bold text-amber-600 group-hover:scale-110 transition">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Free Uses</div>
            </div>
          </div>
        </div>

        {/* Right side - Interactive visualization */}
        <div className="relative h-full min-h-96">
          {/* Glow effect follows mouse */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-400 via-cyan-300 to-amber-300 rounded-3xl blur-2xl opacity-20 transition-all duration-300"
            style={{
              boxShadow: `0 0 40px rgba(16, 168, 83, 0.3)`
            }}
          ></div>

          <div className="relative bg-white dark:bg-slate-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-2xl space-y-6 hover:shadow-3xl hover:border-green-500 dark:hover:border-green-500 transition">
            {/* Stat card 1 - Animated */}
            <div className="group bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-lg transition cursor-pointer transform hover:scale-105">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Disease Detection</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2 group-hover:scale-110 transition">94.2%</div>
                </div>
                <span className="text-3xl group-hover:scale-125 transition">🍃</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-pulse" style={{ width: "94.2%" }}></div>
              </div>
            </div>

            {/* Stat card 2 - Animated */}
            <div className="group bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-2xl p-6 border-l-4 border-cyan-500 hover:shadow-lg transition cursor-pointer transform hover:scale-105" style={{ animationDelay: "0.1s" }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Soil Analysis</div>
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2 group-hover:scale-110 transition">87.8%</div>
                </div>
                <span className="text-3xl group-hover:scale-125 transition">🌱</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: "87.8%", animationDelay: "0.2s" }}></div>
              </div>
            </div>

            {/* Stat card 3 - Animated */}
            <div className="group bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl p-6 border-l-4 border-amber-500 hover:shadow-lg transition cursor-pointer transform hover:scale-105" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Nutrient Prediction</div>
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2 group-hover:scale-110 transition">91.5%</div>
                </div>
                <span className="text-3xl group-hover:scale-125 transition">💡</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: "91.5%", animationDelay: "0.3s" }}></div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce flex items-center gap-2">
              <span>⚡</span> Live Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
