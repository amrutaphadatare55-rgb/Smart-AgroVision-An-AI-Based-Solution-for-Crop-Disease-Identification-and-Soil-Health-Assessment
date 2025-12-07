"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Droplets, Gauge, TrendingUp, Download, RefreshCw, ArrowLeft } from "lucide-react"
import { AnalysisUpload } from "@/components/dashboard/analysis-upload"
import { isGuestActive } from "@/hooks/use-guest"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function SoilDetectionPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
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

  const npkData = analysisResult
    ? [
        {
          name: "N",
          value: Math.min((analysisResult.analysis.npk?.nitrogen / 300) * 100, 100) || 70,
        },
        {
          name: "P",
          value: Math.min((analysisResult.analysis.npk?.phosphorus / 200) * 100, 100) || 45,
        },
        {
          name: "K",
          value: Math.min((analysisResult.analysis.npk?.potassium / 300) * 100, 100) || 65,
        },
      ]
    : []

  const getFertilityStatus = (score: number) => {
    if (score < 4) return { label: "Poor", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950" }
    if (score < 6) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950" }
    if (score < 8) return { label: "Good", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950" }
    return { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950" }
  }

  const fertStatus = analysisResult ? getFertilityStatus(analysisResult.analysis.fertilityScore || 5) : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-orange-50 dark:from-slate-900 dark:via-amber-950 dark:to-slate-900 flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {!analysisResult ? (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4">🌍 Soil Analysis & Quality Detection</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Upload a photo of your soil to analyze composition, fertility, nutrient levels, and moisture content. Get science-backed recommendations for optimal crop growth.
              </p>
            </div>

            {/* Main Layout */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Upload Section */}
              <div className="md:col-span-2">
                <AnalysisUpload onAnalysisComplete={setAnalysisResult} />
              </div>

              {/* Info Panel */}
              <div className="space-y-6">
                {/* What We Analyze */}
                <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700">
                  <h3 className="font-bold text-lg mb-4 text-amber-900 dark:text-amber-100">What We Analyze</h3>
                  <ul className="space-y-3 text-sm text-amber-800 dark:text-amber-200">
                    <li className="flex gap-2">
                      <span>✓</span> <span>Soil type classification</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Fertility score (0-10)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>NPK nutrients balance</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Moisture level detection</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Micronutrient assessment</span>
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700">
                  <h3 className="font-bold text-lg mb-4 text-blue-900 dark:text-blue-100">Photo Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>📸 Close-up soil texture</li>
                    <li>🌞 Natural daylight only</li>
                    <li>🍂 Show actual soil color</li>
                    <li>📏 6 inches from lens</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="space-y-12">
              {/* Header with Results */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-black mb-2">Soil Analysis Results</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzed on {new Date(analysisResult.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="px-6 py-3 rounded-lg border-2 border-amber-500 text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-50 dark:hover:bg-amber-950 transition flex items-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Analyze Another
                  </button>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg transition flex items-center gap-2">
                    <Download size={18} />
                    Download Report
                  </button>
                </div>
              </div>

              {/* Main Results Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Soil Image */}
                <div className="rounded-2xl overflow-hidden border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                  <img
                    src={analysisResult.imageUrl}
                    alt="Soil"
                    className="w-full h-72 object-cover"
                  />
                </div>

                {/* Analysis Results */}
                <div className="md:col-span-2 space-y-4">
                  {/* Soil Type Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-2xl p-8 border-l-4 border-amber-500">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Soil Type</p>
                    <h3 className="text-4xl font-black text-amber-700 dark:text-amber-300 mb-3">
                      {analysisResult.analysis.soilType}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-amber-700 dark:text-amber-300 font-semibold">
                        {Math.round(analysisResult.analysis.soil_confidence * 100)}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Fertility Score Card */}
                  <div className={`rounded-2xl p-8 border-l-4 border-green-500 ${fertStatus?.bg}`}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fertility Score</p>
                    <h3 className={`text-4xl font-black mb-3 ${fertStatus?.color}`}>
                      {(analysisResult.analysis.fertilityScore || 5).toFixed(1)} / 10
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className={`${fertStatus?.color} font-semibold`}>
                        Status: {fertStatus?.label}
                      </span>
                    </div>
                  </div>

                  {/* Moisture Level */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-2xl p-6 border-2 border-cyan-300 dark:border-cyan-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moisture Level</p>
                        <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                          {analysisResult.analysis.moisture || "Optimal"}
                        </p>
                      </div>
                      <Droplets size={40} className="text-cyan-600 dark:text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* NPK Radar Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
                    <Gauge className="inline mr-2" size={20} />
                    NPK Nutrient Balance
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={npkData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="name" stroke="#9ca3af" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                      <Radar name="Level %" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700">
                  <h4 className="font-bold text-lg mb-4 text-green-900 dark:text-green-100">
                    <TrendingUp className="inline mr-2" size={20} />
                    Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {(analysisResult.analysis.recommendations || []).map((rec: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-green-800 dark:text-green-200">
                        <span className="text-green-600 dark:text-green-400 font-bold">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Micronutrients */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-2xl mb-6 text-gray-800 dark:text-gray-200">Micronutrient Profile</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { name: "Iron", value: "4.5 mg/kg", icon: "🔴" },
                    { name: "Zinc", value: "2.1 mg/kg", icon: "⚪" },
                    { name: "Manganese", value: "3.8 mg/kg", icon: "🟡" },
                    { name: "Copper", value: "0.8 mg/kg", icon: "🟠" },
                  ].map((nutrient, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                      <div className="text-3xl mb-2">{nutrient.icon}</div>
                      <h5 className="font-bold text-lg text-purple-900 dark:text-purple-100">{nutrient.name}</h5>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">{nutrient.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fertilizer Recommendations */}
              <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 rounded-2xl p-8 border-2 border-orange-300 dark:border-orange-700">
                <h4 className="font-bold text-2xl mb-6 text-orange-900 dark:text-orange-100">Fertilizer Recommendations</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Nitrogen (N)", amount: "150-200 kg/ha", reason: "For leaf growth" },
                    { name: "Phosphorus (P)", amount: "80-120 kg/ha", reason: "For root development" },
                    { name: "Potassium (K)", amount: "120-150 kg/ha", reason: "For plant strength" },
                  ].map((fert, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl">
                      <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-3">{fert.name}</h5>
                      <p className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2">{fert.amount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{fert.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
