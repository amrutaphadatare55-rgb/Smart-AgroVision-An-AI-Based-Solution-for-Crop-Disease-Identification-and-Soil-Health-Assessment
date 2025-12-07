"use client"

import { useState } from "react"
import { Download, TrendingUp, AlertTriangle, Leaf } from "lucide-react"
import { CropAnalysisChart } from "@/components/charts/crop-analysis-chart"
import { SoilAnalysisChart } from "@/components/charts/soil-analysis-chart"
import { NutrientChart } from "@/components/charts/nutrient-chart"

export function AnalysisResults({ result }: { result: any }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      // Simulate PDF generation
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("PDF report downloaded successfully!")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (result.type === "crop") {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-color-card border border-color-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-color-muted">Crop Type</span>
              <Leaf className="w-4 h-4 text-color-primary" />
            </div>
            <p className="text-2xl font-bold">{result.analysis.cropType}</p>
            <p className="text-xs text-color-muted mt-1">{Math.round(result.analysis.confidence * 100)}% confidence</p>
          </div>

          <div className="bg-color-card border border-color-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-color-muted">Disease</span>
              <AlertTriangle className="w-4 h-4 text-color-error" />
            </div>
            <p className="text-2xl font-bold">{result.analysis.disease}</p>
            <p className="text-xs text-color-muted mt-1">Severity: {result.analysis.severity}%</p>
          </div>

          <div className="bg-color-card border border-color-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-color-muted">Disease Confidence</span>
              <TrendingUp className="w-4 h-4 text-color-accent" />
            </div>
            <p className="text-2xl font-bold">{Math.round(result.analysis.diseaseConfidence * 100)}%</p>
            <p className="text-xs text-color-muted mt-1">Detection accuracy</p>
          </div>
        </div>

        <CropAnalysisChart result={result} />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-color-card border border-color-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg">Recommendations</h3>
            <ul className="space-y-2">
              {result.analysis.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-color-primary font-bold flex-shrink-0">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-color-card border border-color-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg">Treatment Options</h3>
            <div className="space-y-3">
              {result.analysis.treatments.map((treatment: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-color-background rounded-lg">
                  <div>
                    <p className="font-medium">{treatment.name}</p>
                    <p className="text-xs text-color-muted">{treatment.dosage}</p>
                  </div>
                  <p className="font-bold text-color-primary">{treatment.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGeneratePDF}
          disabled={isGeneratingPDF}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-color-secondary to-color-accent text-color-background font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          {isGeneratingPDF ? "Generating PDF..." : "Download PDF Report"}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-color-card border border-color-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-color-muted">Soil Type</span>
            <Leaf className="w-4 h-4 text-color-primary" />
          </div>
          <p className="text-2xl font-bold">{result.analysis.soilType}</p>
          <p className="text-xs text-color-muted mt-1">{Math.round(result.analysis.confidence * 100)}% confidence</p>
        </div>

        <div className="bg-color-card border border-color-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-color-muted">Fertility Score</span>
            <TrendingUp className="w-4 h-4 text-color-accent" />
          </div>
          <p className="text-2xl font-bold">{result.analysis.fertilityScore}/10</p>
          <p className="text-xs text-color-muted mt-1">Soil health indicator</p>
        </div>

        <div className="bg-color-card border border-color-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-color-muted">Moisture Level</span>
            <TrendingUp className="w-4 h-4 text-color-accent" />
          </div>
          <p className="text-2xl font-bold">{result.analysis.moistureLevel}</p>
          <p className="text-xs text-color-muted mt-1">Current conditions</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <NutrientChart result={result} />
        <SoilAnalysisChart result={result} />
      </div>

      <div className="bg-color-card border border-color-border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-lg">Recommendations</h3>
        <ul className="space-y-2">
          {result.analysis.recommendations.map((rec: string, idx: number) => (
            <li key={idx} className="flex gap-3 text-sm">
              <span className="text-color-primary font-bold flex-shrink-0">✓</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleGeneratePDF}
        disabled={isGeneratingPDF}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-color-secondary to-color-accent text-color-background font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Download size={18} />
        {isGeneratingPDF ? "Generating PDF..." : "Download PDF Report"}
      </button>
    </div>
  )
}
