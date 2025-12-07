"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sprout, Zap, TrendingUp, ShieldCheck, Sparkles, Brain, Leaf, BarChart3 } from "lucide-react"
import { AgroVisionLogo } from "@/components/logo"

// Floating particles animation
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 168, 83, 0.5); }
          50% { box-shadow: 0 0 40px rgba(16, 168, 83, 0.8); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed rounded-full bg-green-400/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${Math.max(6, particle.size * 6)}px`,
            height: `${Math.max(6, particle.size * 6)}px`,
            // Use expanded animation properties to avoid mixing shorthand and non-shorthand
            animationName: "float",
            animationDuration: `${8 + Math.random() * 4}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
            animationDelay: `${particle.delay}s`,
            pointerEvents: "none",
            zIndex: 0
          }}
        />
      ))}
    </>
  )
}

export default function LandingPage() {
  const [animate, setAnimate] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setAnimate(true)
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const steps = [
    { icon: "📸", title: "Capture", description: "Take a photo of your crop", emoji: "📷" },
    { icon: "⚡", title: "Analyze", description: "AI processes instantly", emoji: "🤖" },
    { icon: "📊", title: "Insights", description: "Get detailed analysis", emoji: "📈" },
    { icon: "🎯", title: "Action", description: "Receive recommendations", emoji: "✨" }
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden relative">
      {/* Animated background elements */}
      <FloatingParticles />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
          {/* Animated Logo/Title with glow effect */}
          <div className={`text-center mb-12 transition-all duration-1000 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
            <div className="mb-6 inline-block group hover:scale-110 transition relative">
              <div className="absolute inset-0 bg-green-400/30 rounded-full blur-3xl group-hover:bg-green-400/50 transition"></div>
              <AgroVisionLogo size={80} showText={false} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                AgroVision
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2 font-bold">
              🌾 Smart Farming Made Simple
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">✨ AI-Powered Crop & Soil Analysis</p>
          </div>

          {/* Main CTA Section with advanced styling */}
          <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "500ms" }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-green-200 dark:border-green-800 backdrop-blur-sm">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Sparkles className="text-amber-500 animate-spin" size={24} />
                  <Brain className="text-purple-500 animate-pulse" size={24} />
                  <Sparkles className="text-amber-500 animate-spin" style={{ animationDelay: "1s" }} size={24} />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Welcome to Smart Farming
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  📸 Upload a photo of your crop or soil, and let our AI instantly detect diseases, analyze soil quality, and provide personalized recommendations to maximize your harvest.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link
                    href="/detect"
                    className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-110 transition transform hover:from-green-700 hover:to-emerald-700"
                  >
                    🚀 Start Analysis <ArrowRight className="ml-2 group-hover:translate-x-2 transition" size={20} />
                  </Link>
                </div>

                <Link
                  href="/simulator"
                  className="inline-flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-bold text-sm"
                >
                  <Leaf size={16} /> Try Farm Simulator First
                </Link>
              </div>
            </div>
          </div>

          {/* Animated Steps - Enhanced Carousel */}
          <div className={`w-full max-w-5xl transition-all duration-1000 ${animate ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1000ms" }}>
            <h3 className="text-3xl md:text-4xl font-black text-center mb-10 text-gray-900 dark:text-white">
              ⚡ How It Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer group ${
                    currentStep === idx
                      ? "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-500 scale-105 shadow-2xl"
                      : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-green-500 hover:shadow-lg"
                  }`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className={`absolute -top-4 left-4 w-10 h-10 rounded-full font-bold flex items-center justify-center text-lg transition-all ${
                    currentStep === idx
                      ? "bg-green-600 text-white scale-125 shadow-lg"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className={`text-5xl mb-4 mt-3 transition-transform group-hover:scale-125 ${currentStep === idx ? "animate-bounce" : ""}`}>{step.icon}</div>
                  <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  <div className="mt-3 text-3xl opacity-60 group-hover:opacity-100 transition">{step.emoji}</div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 justify-center">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === idx
                      ? "bg-green-600 w-10 shadow-lg"
                      : "bg-gray-300 dark:bg-gray-600 w-2 hover:w-4"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section - Enhanced */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900 dark:text-white">
              Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AgroVision?</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, title: "⚡ Lightning Fast", desc: "Get results in 0.5 seconds", color: "from-yellow-400" },
                { icon: TrendingUp, title: "📈 Accurate Analysis", desc: "Advanced AI detection", color: "from-green-400" },
                { icon: ShieldCheck, title: "🛡️ Secure", desc: "Your data stays private", color: "from-blue-400" },
                { icon: Sprout, title: "🌱 Smart Tips", desc: "Personalized recommendations", color: "from-emerald-400" }
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="group p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl transition transform hover:scale-110 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition shadow-lg`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff),linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff)] bg-[30px_30px] bg-[0_0,15px_15px]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: "1000+", label: "Farmers", emoji: "👨‍🌾", trending: true },
                { value: "50+", label: "Countries", emoji: "🌍", trending: false },
                { value: "500K+", label: "Analyses", emoji: "📊", trending: true },
                { value: "4.9/5", label: "Rating", emoji: "⭐", trending: false }
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="text-5xl mb-3 group-hover:scale-150 group-hover:rotate-12 transition" style={{ transitionDuration: "300ms" }}>{stat.emoji}</div>
                  <div className="text-4xl font-black mb-2 group-hover:scale-110 transition">{stat.value}</div>
                  <p className="text-white/90 group-hover:text-white transition">{stat.label}</p>
                  {stat.trending && <div className="text-xs mt-2 text-green-100">📈 Growing</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 text-gray-900 dark:text-white">
              🔬 Advanced Technology
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "🌈 Spectral Analysis", 
                  desc: "Multi-wavelength imaging", 
                  details: "Advanced vegetation indices for precise crop health assessment",
                  icon: "📊"
                },
                { 
                  title: "🏗️ Spatial Features", 
                  desc: "Deep learning processing", 
                  details: "Multi-scale image analysis for comprehensive diagnostics",
                  icon: "🔍"
                },
                { 
                  title: "🧠 AI Intelligence", 
                  desc: "Machine learning models", 
                  details: "Intelligent analysis for accurate disease and nutrient detection",
                  icon: "⚡"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-green-300 dark:border-green-700 hover:shadow-2xl transition">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-3">{feature.desc}</p>
                  <p className="text-gray-600 dark:text-gray-400">{feature.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section - Premium */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition"></div>
              <div className="relative rounded-3xl p-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border-2 border-green-300 dark:border-green-700">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
                  🌾 Ready to Transform Your Farm?
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
                  Join thousands of farmers using AgroVision to increase yields and make smarter decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/detect"
                    className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-110 transition transform"
                  >
                    🚀 Start Free Now <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <Link
                    href="/simulator"
                    className="inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-green-600 text-green-600 dark:text-green-400 font-bold bg-white dark:bg-slate-800 hover:scale-105 transition"
                  >
                    🎮 Try Simulator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 AgroVision. 🌱 Smart farming for modern farmers.</p>
        </footer>
      </div>
    </div>
  )
}
