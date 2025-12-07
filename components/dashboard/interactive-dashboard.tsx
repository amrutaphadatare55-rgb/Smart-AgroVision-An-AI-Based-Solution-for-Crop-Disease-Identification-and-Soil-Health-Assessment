"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Upload, Zap, TrendingUp, AlertTriangle, Leaf, Droplets, History } from "lucide-react"
import { AnalysisUpload } from "@/components/dashboard/analysis-upload"
import { AnalysisPreview } from "@/components/dashboard/analysis-preview"

export function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState("choose")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([])

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result)
    const newHistory = [result, ...recentAnalyses.slice(0, 9)]
    setRecentAnalyses(newHistory)
    localStorage.setItem("agroVisionHistory", JSON.stringify(newHistory))
    setActiveTab("results")
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem("agroVisionHistory")
    if (savedHistory) {
      setRecentAnalyses(JSON.parse(savedHistory))
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Choose Detection Type */}
      {activeTab === "choose" && (
        <>
          {/* Dashboard Hero */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2">Smart Detection Dashboard</h1>
                  <p className="text-lg text-white/90 max-w-2xl">
                    Choose what you want to analyze: crop health and diseases, or soil quality and nutrients. Each path is optimized for maximum insights.
                  </p>
                </div>
                <span className="text-7xl animate-bounce">🎯</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold">2 Types</div>
                  <div className="text-sm text-white/80">Analysis</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-sm text-white/80">Accuracy</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl font-bold">Real-Time</div>
                  <div className="text-sm text-white/80">Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detection Type Selection */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Crop Detection */}
            <Link href="/detect/crop">
              <div className="group cursor-pointer h-full">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-8 border-2 border-green-300 dark:border-green-700 hover:border-green-500 hover:shadow-xl transition h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-3xl group-hover:scale-110 transition">
                      🌾
                    </div>
                    <div className="text-3xl">→</div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">Crop Detection</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Identify crop types, detect diseases, assess severity, and get treatment recommendations.
                  </p>
                  <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                    <li>✓ Crop identification</li>
                    <li>✓ Disease detection</li>
                    <li>✓ Severity metrics</li>
                    <li>✓ Treatment guides</li>
                  </ul>
                </div>
              </div>
            </Link>

            {/* Soil Detection */}
            <Link href="/detect/soil">
              <div className="group cursor-pointer h-full">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl p-8 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-500 hover:shadow-xl transition h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl group-hover:scale-110 transition">
                      🌍
                    </div>
                    <div className="text-3xl">→</div>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300 mb-3">Soil Analysis</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Analyze soil type, fertility, NPK nutrients, and moisture levels with detailed insights.
                  </p>
                  <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                    <li>✓ Soil classification</li>
                    <li>✓ Fertility scoring</li>
                    <li>✓ NPK analysis</li>
                    <li>✓ Fertilizer tips</li>
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}

      {/* Upload & Results Tabs */}
      {activeTab !== "choose" && (
        <>
          {/* Quick Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("upload")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Upload size={20} />
              Upload & Analyze
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <History size={20} />
              View History
            </button>
            <button
              onClick={() => setActiveTab("choose")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              ← Back to Selection
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "upload" && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload & Analyze</h2>
              <AnalysisUpload onAnalysisComplete={handleAnalysisComplete} />
            </div>
          )}

          {activeTab === "results" && analysisResult && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analysis Results</h2>
              <AnalysisPreview result={analysisResult} />
            </div>
          )}

          {activeTab === "history" && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Analyses</h2>
              {recentAnalyses.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No analyses yet. Start by uploading a crop or soil image.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {recentAnalyses.map((analysis, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition" onClick={() => {
                      setAnalysisResult(analysis)
                      setActiveTab("results")
                    }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{analysis.cropType || analysis.crop_type || analysis.soil_type || "Analysis"}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-bold ${analysis.disease_detected ? "text-red-500" : "text-green-500"}`}>
                            {analysis.disease_detected ? "⚠️ Disease" : "✓ Healthy"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Stats Footer */}
      <div className="grid sm:grid-cols-4 gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">12.5K+</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Analyses</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600">94%</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-600">2.3s</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Speed</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-cyan-600">195</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Countries</p>
        </div>
      </div>
    </div>
  )
}
