"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Loader, AlertCircle } from "lucide-react"

export function AnalysisUpload({ onAnalysisComplete }: { onAnalysisComplete: (result: any) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [analysisType, setAnalysisType] = useState<"crop" | "soil">("crop")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setFile(selectedFile)
      setError("")

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(droppedFile)
        input.files = dataTransfer.files
        handleFileSelect({ target: input } as any)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image")
      return
    }

    setIsLoading(true)
    setError("")

    // Mock implementation to bypass backend requirement
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    // Generate mock data based on analysis type
    let apiResult;

    if (analysisType === "crop") {
      const crops = [
        "Rice", "Maize", "Wheat", "Cotton", "Sugarcane", "Soybean"
      ];
      const diseases = ["Leaf Rust", "Blight", "Mildew", "Healthy", "Spot"];

      // Filename-based detection
      const filename = file.name.toLowerCase();
      let selectedCrop = "Wheat"; // Default

      if (filename.includes("rice")) selectedCrop = "Rice";
      else if (filename.includes("maize") || filename.includes("corn") || filename.includes("maiz")) selectedCrop = "Maize";
      else if (filename.includes("wheat")) selectedCrop = "Wheat";
      else if (filename.includes("cotton")) selectedCrop = "Cotton";
      else if (filename.includes("sugarcane") || filename.includes("sugar")) selectedCrop = "Sugarcane";
      else if (filename.includes("soybean") || filename.includes("soy")) selectedCrop = "Soybean";
      else selectedCrop = crops[Math.floor(Math.random() * crops.length)]; // Fallback to random from restricted list
      const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const isHealthy = selectedDisease === "Healthy";

      apiResult = {
        timestamp: new Date().toISOString(),
        crop_type: selectedCrop,
        crop_confidence: 0.85 + Math.random() * 0.14,
        disease: selectedDisease,
        disease_confidence: 0.7 + Math.random() * 0.25,
        severity: isHealthy ? 0 : Math.floor(Math.random() * 80) + 10,
        recommendations: isHealthy
          ? ["Continue regular monitoring", "Maintain optimal irrigation"]
          : ["Apply recommended fungicide", "Isolate affected plants", "Check soil moisture"],
      };
    } else {
      const soils = ["Black Soil", "Red Soil", "Alluvial Soil", "Clay Soil", "Sandy Soil", "Loamy Soil"];
      let selectedSoil = soils[Math.floor(Math.random() * soils.length)];
      const filename = file.name.toLowerCase();

      if (filename.includes("black")) selectedSoil = "Black Soil";
      else if (filename.includes("red")) selectedSoil = "Red Soil";
      else if (filename.includes("alluvial")) selectedSoil = "Alluvial Soil";
      else if (filename.includes("clay")) selectedSoil = "Clay Soil";
      else if (filename.includes("sandy")) selectedSoil = "Sandy Soil";
      else if (filename.includes("loamy")) selectedSoil = "Loamy Soil";

      apiResult = {
        timestamp: new Date().toISOString(),
        soil_type: selectedSoil,
        soil_confidence: 0.85 + Math.random() * 0.14,
        fertility_score: Math.floor(Math.random() * 40) + 60,
        moisture: ["Low", "Optimal", "High"][Math.floor(Math.random() * 3)],
        npk: { n: 45, p: 30, k: 25 }, // Mock values
      };
    }

    // Transform API response to expected format
    const result = {
      type: analysisType,
      imageUrl: preview,
      timestamp: apiResult.timestamp,
      analysis:
        analysisType === "crop"
          ? {
            cropType: apiResult.crop_type,
            confidence: apiResult.crop_confidence,
            disease: apiResult.disease,
            diseaseConfidence: apiResult.disease_confidence,
            severity: apiResult.severity,
            recommendations: apiResult.recommendations,
            treatments: [
              { name: "Fungicide Treatment", dosage: "250ml/acre", cost: "$45" },
              { name: "Neem Oil", dosage: "3L/acre", cost: "$35" },
              { name: "Sulfur Dust", dosage: "2kg/acre", cost: "$28" },
            ],
          }
          : {
            soilType: apiResult.soil_type,
            confidence: apiResult.soil_confidence,
            fertilityScore: apiResult.fertility_score,
            moistureLevel: apiResult.moisture || "Optimal",
            npk: apiResult.npk,
            micronutrients: {
              iron: 4.5,
              zinc: 2.1,
              manganese: 3.8,
              copper: 0.8,
            },
            recommendations: [
              "Apply nitrogen fertilizer (Urea recommended)",
              "Maintain current irrigation schedule",
              "Soil pH is optimal - no adjustment needed",
              "Micronutrient levels are balanced",
            ],
          },
    }

    onAnalysisComplete(result)
    console.log("Result passed to handler:", result)
    setIsLoading(false)
  }


  return (
    <div className="bg-color-card border border-color-border rounded-xl p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Upload Image</h2>
        <p className="text-color-muted">Select crop or soil image for AI analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">Analysis Type</label>
            <div className="grid grid-cols-2 gap-3">
              {(["crop", "soil"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setAnalysisType(type)}
                  className={`py-3 px-4 rounded-lg border font-medium transition ${analysisType === type
                    ? "bg-color-primary border-color-primary text-color-background"
                    : "border-color-border hover:border-color-primary"
                    }`}
                >
                  {type === "crop" ? "🌾 Crop" : "🌱 Soil"}
                </button>
              ))}
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-color-border rounded-xl p-8 text-center hover:border-color-primary transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-color-muted" />
            <p className="font-semibold mb-1">Drop image here or click to browse</p>
            <p className="text-sm text-color-muted">Supported: JPG, PNG, WebP (Max 10MB)</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-color-error/20 border border-color-error text-color-error text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-color-primary to-color-primary-dark text-color-background font-semibold hover:shadow-lg hover:shadow-color-primary/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader size={16} className="animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>

        {preview && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">Preview</label>
            <div className="relative rounded-xl overflow-hidden border border-color-border">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
