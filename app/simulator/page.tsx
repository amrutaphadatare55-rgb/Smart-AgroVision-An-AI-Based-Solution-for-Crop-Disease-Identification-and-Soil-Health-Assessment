"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Activity, Leaf, Droplets, Wind, Sun, Zap } from "lucide-react"

export default function FarmSimulatorPage() {
  const [crops, setCrops] = useState([
    { id: 1, name: "Rice Field A", health: 85, disease: 0, moisture: 65, disease_name: "Healthy" },
    { id: 2, name: "Corn Field B", health: 72, disease: 15, moisture: 70, disease_name: "Early Blight" },
    { id: 3, name: "Wheat Field C", health: 90, disease: 2, moisture: 55, disease_name: "Healthy" },
    { id: 4, name: "Soil Plot D", health: 78, disease: 8, moisture: 60, disease_name: "Leaf Spot" }
  ])

  const [selectedCrop, setSelectedCrop] = useState(crops[0])
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    setAnimateStats(true)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCrops(prev =>
        prev.map(crop => ({
          ...crop,
          health: Math.min(100, crop.health + (Math.random() - 0.4) * 5),
          disease: Math.max(0, crop.disease + (Math.random() - 0.5) * 3),
          moisture: 50 + Math.sin(Date.now() / 5000) * 20 + Math.random() * 10
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updated = crops.find(c => c.id === selectedCrop.id)
    if (updated) setSelectedCrop(updated)
  }, [crops])

  const getHealthColor = (health: number) => {
    if (health > 80) return "from-green-400 to-emerald-500"
    if (health > 60) return "from-yellow-400 to-amber-500"
    if (health > 40) return "from-orange-400 to-red-400"
    return "from-red-500 to-red-600"
  }

  const getHealthLabel = (health: number) => {
    if (health > 80) return "Excellent"
    if (health > 60) return "Good"
    if (health > 40) return "Fair"
    return "Poor"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-md border-b border-green-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-2xl gradient-text">
              🌾 AgroVision
            </Link>
            <div className="flex gap-4">
              <Link href="/detect/crop" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                Analyze
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Farm Simulator
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real-time crop health monitoring with AI-powered insights</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Crop List */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-slate-700 p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">📍 Your Fields</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {crops.map(crop => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`w-full p-4 rounded-xl transition transform hover:scale-105 ${
                        selectedCrop.id === crop.id
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-bold text-sm">{crop.name}</div>
                        <div className="text-xs mt-2 flex items-center gap-2">
                          <Leaf size={14} />
                          Health: {crop.health.toFixed(0)}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Panel - Main Display */}
            <div className="lg:col-span-2">
              {/* Large Farm Visualization */}
              <div className="rounded-2xl bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-slate-900 border-2 border-green-300 dark:border-slate-700 p-8 shadow-xl mb-8 overflow-hidden relative">
                {/* Animated background field */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#10a853_25%,transparent_25%,transparent_75%,#10a853_75%,#10a853),linear-gradient(45deg,#10a853_25%,transparent_25%,transparent_75%,#10a853_75%,#10a853)] bg-[30px_30px] bg-[0_0,15px_15px] opacity-5"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{selectedCrop.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {selectedCrop.disease_name}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                          {getHealthLabel(selectedCrop.health)}
                        </span>
                      </div>
                    </div>
                    <div className="text-5xl font-black text-gray-400 dark:text-gray-600 opacity-50 animate-pulse">
                      🌾
                    </div>
                  </div>

                  {/* Large Health Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Leaf size={18} className="text-green-500" />
                        Crop Health
                      </span>
                      <span className={`text-3xl font-black bg-gradient-to-r ${getHealthColor(selectedCrop.health)} bg-clip-text text-transparent`}>
                        {selectedCrop.health.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${getHealthColor(selectedCrop.health)} transition-all duration-500`}
                        style={{ width: `${selectedCrop.health}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Disease/Stress Indicator */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Activity size={18} className="text-red-500" />
                        Disease Risk
                      </span>
                      <span className={`text-2xl font-black ${selectedCrop.disease > 30 ? "text-red-500" : selectedCrop.disease > 15 ? "text-yellow-500" : "text-green-500"}`}>
                        {selectedCrop.disease.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          selectedCrop.disease > 30
                            ? "from-red-400 to-red-500"
                            : selectedCrop.disease > 15
                            ? "from-yellow-400 to-orange-500"
                            : "from-green-400 to-emerald-500"
                        } transition-all duration-500`}
                        style={{ width: `${selectedCrop.disease}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Moisture Level */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Droplets size={18} className="text-blue-500" />
                        Soil Moisture
                      </span>
                      <span className="text-2xl font-black text-blue-500">{selectedCrop.moisture.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-500"
                        style={{ width: `${selectedCrop.moisture}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Conditions */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="text-amber-500" size={20} />
                    <span className="font-bold text-gray-700 dark:text-gray-300">Sunlight</span>
                  </div>
                  <div className="text-2xl font-black text-amber-500">{(70 + Math.sin(Date.now() / 3000) * 20).toFixed(0)}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal exposure</div>
                </div>

                <div className="rounded-xl bg-white dark:bg-slate-800 border border-cyan-300 dark:border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="text-cyan-500" size={20} />
                    <span className="font-bold text-gray-700 dark:text-gray-300">Wind</span>
                  </div>
                  <div className="text-2xl font-black text-cyan-500">{(5 + Math.random() * 10).toFixed(1)} m/s</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Good airflow</div>
                </div>

                <div className="rounded-xl bg-white dark:bg-slate-800 border border-green-300 dark:border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-green-500" size={20} />
                    <span className="font-bold text-gray-700 dark:text-gray-300">Growth</span>
                  </div>
                  <div className="text-2xl font-black text-green-500">{(selectedCrop.health / 10).toFixed(1)}/10</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Vigor index</div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Crop Performance Trends */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-slate-700 p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">📈 Performance Trends</h3>
              <div className="space-y-4">
                {crops.map((crop, idx) => (
                  <div key={crop.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{crop.name}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{crop.health.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getHealthColor(crop.health)}`}
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 border-2 border-cyan-300 dark:border-slate-700 p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">💡 AI Recommendations</h3>
              <div className="space-y-3">
                {selectedCrop.disease > 20 ? (
                  <>
                    <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 border-l-4 border-red-500">
                      <p className="font-bold text-red-900 dark:text-red-100">⚠️ High Disease Risk</p>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">Apply fungicide treatment immediately</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 border-l-4 border-green-500">
                      <p className="font-bold text-green-900 dark:text-green-100">✓ Healthy Status</p>
                      <p className="text-sm text-green-800 dark:text-green-200 mt-1">Continue regular monitoring schedule</p>
                    </div>
                  </>
                )}

                {selectedCrop.moisture < 50 ? (
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500">
                    <p className="font-bold text-yellow-900 dark:text-yellow-100">💧 Irrigation Needed</p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">Soil moisture is below optimal level</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900 border-l-4 border-cyan-500">
                    <p className="font-bold text-cyan-900 dark:text-cyan-100">💧 Moisture Optimal</p>
                    <p className="text-sm text-cyan-800 dark:text-cyan-200 mt-1">Irrigation schedule is adequate</p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 border-l-4 border-green-500">
                  <p className="font-bold text-green-900 dark:text-green-100">🌱 Smart Analysis</p>
                  <p className="text-sm text-green-800 dark:text-green-200 mt-1">Advanced AI monitoring active</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
            <h2 className="text-3xl font-black mb-4">Get Real Analysis</h2>
            <p className="mb-6 text-lg opacity-90">Upload your own crop/soil image and get AI-powered insights</p>
            <Link
              href="/detect"
              className="inline-block px-8 py-4 rounded-lg bg-white text-green-600 font-bold hover:shadow-lg transition"
            >
              Analyze Your Farm Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
