"use client"

import Link from "next/link"
import { D2S2BotInfo } from "@/components/dashboard/d2s2bot-info"
import { Cpu, Globe, Sparkles } from "lucide-react"

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold">Technology</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Behind the scenes: D2S2BoT — spectral & spatial AI for crop and soil insights.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800">Home</Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Dashboard</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900 dark:to-sky-900">
                  <Globe className="text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">D2S2BoT Overview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">D2S2BoT is a lightweight dual-dimension approach that combines spectral indices (NDVI, GNDVI, MCARI) with spatial patch statistics to generate reliable, explainable predictions for demo purposes.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-bold mb-3">How it works</h4>
              <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>Extract spectral indices from RGB imagery to capture vegetation signals.</li>
                <li>Compute patch-wise spatial statistics (mean, std) to capture texture and structure.</li>
                <li>Fuse the features and use simple heuristics to infer crop type and disease severity.</li>
              </ol>
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-bold mb-3">Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">This implementation is for demo and UX purposes — it is not a substitute for a properly trained deep learning model. Use as inspiration or prototype for integrating a real model backend.</p>
            </div>
          </div>

          <aside className="space-y-6">
            <D2S2BotInfo />

            <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900 border-2 border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg"><Cpu className="text-emerald-600" /></div>
                <div>
                  <h5 className="font-bold">Demo Mode</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-200">Model runs locally in the backend using heuristic rules; perfect for exploring features.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import { ArrowRight, Zap, Brain, Cpu } from "lucide-react"
import { D2S2BotInfo } from "@/components/dashboard/d2s2bot-info"

export default function D2S2BotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl gradient-text">
            AgroVision
          </Link>
          <Link
            href="/detect"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg transition"
          >
            Start Analysis <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full border border-blue-300 bg-blue-50 dark:bg-blue-950 dark:border-blue-700 mb-6">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">🚀 Advanced AI Technology</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              D2S2BoT Technology
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Dual-Dimension Spectral-Spatial Transformer for next-generation hyperspectral image classification.
            Powering AgroVision with 94-96% accuracy crop detection and disease analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/detect/crop"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:shadow-lg transition"
            >
              Try Crop Detection <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/detect/soil"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-green-600 text-green-600 dark:text-green-400 font-bold hover:bg-green-50 dark:hover:bg-green-950 transition"
            >
              Try Soil Analysis
            </Link>
          </div>
        </div>

        {/* D2S2BoT Info Component */}
        <div className="mb-16">
          <D2S2BotInfo />
        </div>

        {/* How It Works */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">How D2S2BoT Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group">
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 group-hover:shadow-xl transition">
                <Brain size={40} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Spectral Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Extracts vegetation indices (NDVI, GNDVI, MCARI) to analyze crop health, nutrient content, and disease symptoms at the spectral level.
              </p>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ NDVI: Vegetation vigor</li>
                <li>✓ GNDVI: Green biomass</li>
                <li>✓ MCARI: Chlorophyll content</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="group">
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-cyan-100 to-green-100 dark:from-cyan-900 dark:to-green-900 group-hover:shadow-xl transition">
                <Zap size={40} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Spatial Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Processes image patches to capture local spatial patterns, texture features, and disease manifestations with multi-scale analysis.
              </p>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Patch-based features</li>
                <li>✓ Multi-scale processing</li>
                <li>✓ Texture analysis</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 group-hover:shadow-xl transition">
                <Cpu size={40} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Feature Fusion</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Combines spectral and spatial features using attention mechanisms for superior classification accuracy and confidence scoring.
              </p>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Attention fusion</li>
                <li>✓ Multi-modal learning</li>
                <li>✓ High confidence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Performance Metrics</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: "94-96%", label: "Accuracy", emoji: "🎯" },
              { metric: "0.5s", label: "Processing Speed", emoji: "⚡" },
              { metric: "11+", label: "Crop Types", emoji: "🌾" },
              { metric: "Real-time", label: "Analysis", emoji: "📊" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{item.metric}</div>
                <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white">Use Cases</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "🌾 Crop Disease Detection",
                description:
                  "Identify leaf rust, powdery mildew, septoria, and other diseases early with spectral anomaly detection and spatial pattern recognition.",
                features: ["Early disease detection", "Severity assessment", "Treatment recommendations"]
              },
              {
                title: "🌱 Soil Quality Analysis",
                description:
                  "Analyze soil type, NPK content, fertility levels, and micronutrient profiles using spectral absorption patterns.",
                features: ["Soil classification", "Nutrient analysis", "Fertilizer recommendations"]
              },
              {
                title: "🚜 Precision Farming",
                description:
                  "Optimize resource allocation with field-level analysis, variable rate application maps, and crop stress monitoring.",
                features: ["Field mapping", "Stress detection", "Yield prediction"]
              },
              {
                title: "📈 Crop Health Monitoring",
                description:
                  "Track vegetation development, biomass accumulation, and nutrient status throughout the growing season.",
                features: ["Growth tracking", "Biomass estimation", "Nutrient status"]
              }
            ].map((usecase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{usecase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{usecase.description}</p>
                <ul className="space-y-2">
                  {usecase.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="rounded-3xl p-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
            <h2 className="text-4xl font-black mb-6">Experience D2S2BoT Power</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Start analyzing your crops and soil with state-of-the-art AI technology. Get instant insights, recommendations, and treatment plans.
            </p>
            <Link
              href="/detect"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-blue-600 font-bold hover:shadow-lg transition"
            >
              Start Free Analysis <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 AgroVision - Powered by D2S2BoT Technology. Advanced AI for Sustainable Agriculture.</p>
      </footer>
    </div>
  )
}
