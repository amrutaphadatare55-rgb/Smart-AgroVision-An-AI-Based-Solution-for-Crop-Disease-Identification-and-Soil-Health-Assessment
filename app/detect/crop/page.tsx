"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AlertCircle, Leaf, Zap, TrendingUp, Download, RefreshCw, ArrowLeft } from "lucide-react"
import { AnalysisUpload } from "@/components/dashboard/analysis-upload"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

import { isGuestActive } from "@/hooks/use-guest"

export default function CropDetectionPage() {
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

  // Sample disease progression data
  const diseaseProgressionData = analysisResult
    ? [
        { day: "Today", severity: analysisResult.analysis.severity * 0.5 },
        { day: "+1 Day", severity: analysisResult.analysis.severity * 0.7 },
        { day: "+2 Days", severity: analysisResult.analysis.severity * 0.85 },
        { day: "+3 Days", severity: analysisResult.analysis.severity },
        { day: "+5 Days", severity: Math.max(analysisResult.analysis.severity - 15, 0) },
        { day: "+7 Days", severity: Math.max(analysisResult.analysis.severity - 25, 0) },
      ]
    : []

  const getSeverityStatus = (severity: number) => {
    if (severity < 20) return { label: "Healthy", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950" }
    if (severity < 50) return { label: "Caution", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950" }
    if (severity < 80) return { label: "Warning", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950" }
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950" }
  }

  const status = analysisResult ? getSeverityStatus(analysisResult.analysis.severity) : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-950 dark:to-slate-900 flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {!analysisResult ? (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4">🌾 Crop Disease Detection</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Upload a photo of your crop leaves or plants to detect diseases, identify crop varieties, and get personalized treatment recommendations.
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
                {/* What We Detect */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700">
                  <h3 className="font-bold text-lg mb-4 text-green-900 dark:text-green-100">What We Detect</h3>
                  <ul className="space-y-3 text-sm text-green-800 dark:text-green-200">
                    <li className="flex gap-2">
                      <span>✓</span> <span>Crop variety & species</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Disease identification</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Severity assessment</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Fungicide recommendations</span>
                    </li>
                    <li className="flex gap-2">
                      <span>✓</span> <span>Recovery timeline</span>
                    </li>
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700">
                  <h3 className="font-bold text-lg mb-4 text-blue-900 dark:text-blue-100">Photo Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>📸 Clear, well-lit photo</li>
                    <li>🍃 Show affected leaves</li>
                    <li>🚫 Avoid shadows & blur</li>
                    <li>📏 Fill frame with leaves</li>
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
                  <h2 className="text-4xl font-black mb-2">Analysis Results</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzed on {new Date(analysisResult.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="px-6 py-3 rounded-lg border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-950 transition flex items-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Analyze Another
                  </button>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition flex items-center gap-2">
                    <Download size={18} />
                    Download Report
                  </button>
                </div>
              </div>

              {/* Main Results Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Crop Image */}
                <div className="rounded-2xl overflow-hidden border-2 border-green-300 dark:border-green-700 shadow-lg">
                  <img
                    src={analysisResult.imageUrl}
                    alt="Crop"
                    className="w-full h-72 object-cover"
                  />
                </div>

                {/* Detection Results */}
                <div className="md:col-span-2 space-y-4">
                  {/* Crop Type Card */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-8 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Detected Crop</p>
                    <h3 className="text-4xl font-black text-green-700 dark:text-green-300 mb-3">
                      {analysisResult.analysis.cropType}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-green-700 dark:text-green-300 font-semibold">
                        {Math.round(analysisResult.analysis.confidence * 100)}% Match Confidence
                      </span>
                    </div>
                  </div>

                  {/* Disease Card */}
                  <div className={`rounded-2xl p-8 border-l-4 border-red-500 ${status?.bg}`}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Disease Detected</p>
                    <h3 className={`text-4xl font-black mb-3 ${status?.color}`}>
                      {analysisResult.analysis.disease}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className={`${status?.color} font-semibold`}>
                        Status: {status?.label}
                      </span>
                    </div>
                  </div>

                  {/* Severity Meter */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-800 dark:text-gray-200">Disease Severity</span>
                      <span className={`text-3xl font-black ${status?.color}`}>
                        {Math.round(analysisResult.analysis.severity)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          analysisResult.analysis.severity < 30
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : analysisResult.analysis.severity < 60
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                              : "bg-gradient-to-r from-red-400 to-rose-500"
                        }`}
                        style={{ width: `${analysisResult.analysis.severity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Disease Progression */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
                    <TrendingUp className="inline mr-2" size={20} />
                    Disease Progression Timeline
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={diseaseProgressionData}>
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="severity"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700">
                  <h4 className="font-bold text-lg mb-4 text-purple-900 dark:text-purple-100">
                    <Zap className="inline mr-2" size={20} />
                    Treatment Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {(analysisResult.analysis.recommendations || []).map((rec: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-purple-800 dark:text-purple-200">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Treatment Options */}
              {analysisResult.analysis.treatments && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-2xl mb-6 text-gray-800 dark:text-gray-200">
                    <Leaf className="inline mr-2" size={24} />
                    Available Treatments
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analysisResult.analysis.treatments.map((treatment: any, idx: number) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-xl border-2 border-green-200 dark:border-green-700">
                        <h5 className="font-bold text-lg text-green-900 dark:text-green-100 mb-3">{treatment.name}</h5>
                        <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                          <p>
                            <strong>Dosage:</strong> {treatment.dosage}
                          </p>
                          <p>
                            <strong>Cost:</strong> {treatment.cost}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
