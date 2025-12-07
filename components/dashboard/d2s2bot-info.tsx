"use client"

import { Info, Cpu, Sparkles } from "lucide-react"

export default function D2S2BotInfo() {
  "use client"

  import { Info, Cpu, Sparkles } from "lucide-react"

  export function D2S2BotInfo() {
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">D2S2BoT</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dual-Dimension Spectral-Spatial Transformer — a hybrid heuristic model that fuses spectral indices and spatial patch features to predict crop type and disease severity from imagery.</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">Spectral Index Fusion</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs">Spatial Patch Stats</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs">Lightweight</span>
          </div>

          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-2"><Sparkles className="text-yellow-500" /> Provides interpretable scores for NDVI/GNDVI and patch-level variance.</p>
            <p className="flex items-center gap-2 mt-2"><Info className="text-sky-500" /> Used for demo, not a production-trained transformer model.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Zap, Cpu, Database } from "lucide-react"

  export default D2S2BotInfo

  const [modelInfo, setModelInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/model-info")
        if (response.ok) {
          const data = await response.json()
          setModelInfo(data)
        }
      } catch (error) {
        console.error("Error fetching model info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModelInfo()
  }, [])

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 border-2 border-blue-300 dark:border-blue-700 animate-pulse">
        <div className="h-8 bg-blue-300 dark:bg-blue-600 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-2/3"></div>
      </div>
    )
  }

  if (!modelInfo) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 border-2 border-blue-300 dark:border-blue-700">
        <div className="flex items-center gap-3 mb-3">
          <Cpu className="text-blue-600 dark:text-blue-300" size={28} />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{modelInfo.model_name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{modelInfo.full_name}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-200">{modelInfo.description}</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Spectral Features */}
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900 border-l-4 border-purple-500">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
            <Zap size={18} /> Spectral Analysis
          </h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            {modelInfo.features.spectral.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spatial Features */}
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900 border-l-4 border-green-500">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
            <Database size={18} /> Spatial Analysis
          </h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            {modelInfo.features.spatial.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fusion Method */}
        <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900 border-l-4 border-cyan-500">
          <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-3">Feature Fusion</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{modelInfo.features.fusion}</p>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <p>🎯 Accuracy: {modelInfo.accuracy}</p>
            <p>⚡ Speed: {modelInfo.processing_time}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900 border-2 border-amber-300 dark:border-amber-700">
        <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Model Capabilities</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {modelInfo.capabilities.map((capability, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-orange-500 text-lg">🌾</span>
              <span className="text-gray-700 dark:text-gray-200">{capability}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Info */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>D2S2BoT</strong> combines dual-dimension processing: spectral features extract 
          vegetation and soil properties through indices like NDVI and GNDVI, while spatial features 
          capture local patterns through patch-based analysis. These dimensions are fused using 
          attention mechanisms for superior classification accuracy in crop and soil analysis.
        </p>
      </div>
    </div>
  )
}
