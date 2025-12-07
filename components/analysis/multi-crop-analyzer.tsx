"use client"

import { useState, useRef } from "react"
import { Upload, X, Loader2, Activity, Sprout, AlertTriangle, History, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnalysisCard } from "./analysis-card"
import { RealTimeChart } from "./real-time-chart"
import { motion, AnimatePresence } from "framer-motion"

interface AnalysisResult {
    id: string
    cropType: string
    confidence: number
    disease: string
    diseaseConfidence: number
    severity: number
    timestamp: string
}

export function MultiCropAnalyzer() {
    const [images, setImages] = useState<{ id: string; url: string; file: File }[]>([])
    const [analyzing, setAnalyzing] = useState(false)
    const [results, setResults] = useState<AnalysisResult[]>([])
    const [history, setHistory] = useState<AnalysisResult[]>([])
    const [showHistory, setShowHistory] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const savedHistory = localStorage.getItem("agroVisionHistory")
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory))
        }
    }, [])

    const saveToHistory = (newItems: AnalysisResult[]) => {
        const updatedHistory = [...newItems, ...history].slice(0, 50)
        setHistory(updatedHistory)
        localStorage.setItem("agroVisionHistory", JSON.stringify(updatedHistory))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map((file) => ({
                id: Math.random().toString(36).substring(7),
                url: URL.createObjectURL(file),
                file,
            }))
            setImages((prev) => [...prev, ...newImages])
        }
    }

    const removeImage = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id))
        setResults((prev) => prev.filter((res) => res.id !== id))
    }

    const analyzeImages = async () => {
        setAnalyzing(true)
        setResults([])

        // Simulate real-time analysis with staggered delays
        const newResults: AnalysisResult[] = []

        for (const img of images) {
            // Mock API call delay
            await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1000))

            // Mock result generation with expanded crop list
            const allCrops = [
                "Rice", "Maize", "Wheat", "Cotton", "Sugarcane", "Soybean"
            ]
            let detectedCrop = allCrops[Math.floor(Math.random() * allCrops.length)]

            // Simple filename-based detection for better mock experience
            const filename = img.file.name.toLowerCase()

            if (filename.includes("rice")) detectedCrop = "Rice"
            else if (filename.includes("maize") || filename.includes("corn") || filename.includes("maiz")) detectedCrop = "Maize"
            else if (filename.includes("wheat")) detectedCrop = "Wheat"
            else if (filename.includes("cotton")) detectedCrop = "Cotton"
            else if (filename.includes("sugarcane") || filename.includes("sugar")) detectedCrop = "Sugarcane"
            else if (filename.includes("soybean") || filename.includes("soy")) detectedCrop = "Soybean"
            else {
                const cropMatch = allCrops.find(c => filename.includes(c.toLowerCase()))
                if (cropMatch) detectedCrop = cropMatch
            }

            // Soil detection logic
            let isSoil = false
            if (filename.includes("soil")) {
                isSoil = true
                if (filename.includes("black")) detectedCrop = "Black Soil"
                else if (filename.includes("red")) detectedCrop = "Red Soil"
                else if (filename.includes("alluvial")) detectedCrop = "Alluvial Soil"
                else if (filename.includes("clay")) detectedCrop = "Clay Soil"
                else if (filename.includes("sandy")) detectedCrop = "Sandy Soil"
                else if (filename.includes("loamy")) detectedCrop = "Loamy Soil"
                else detectedCrop = "Unknown Soil"
            }

            const mockResult: AnalysisResult = {
                id: img.id,
                cropType: detectedCrop,
                confidence: 0.85 + Math.random() * 0.14,
                disease: ["Healthy", "Leaf Rust", "Blight", "Mildew", "Rot", "Wilt", "Spot", "Mosaic"][Math.floor(Math.random() * 8)],
                diseaseConfidence: 0.7 + Math.random() * 0.25,
                severity: Math.random() * 100,
                timestamp: new Date().toISOString(),
            }

            // If healthy or soil, severity is 0 (or re-purposed for soil fertility if needed, but keeping simple for now)
            if (mockResult.disease === "Healthy" || isSoil) {
                mockResult.severity = 0
            }

            if (isSoil) {
                mockResult.disease = "N/A" // Soil doesn't have diseases in this context usually
                mockResult.diseaseConfidence = 0
            }

            newResults.push(mockResult)
            setResults((prev) => [...prev, mockResult])
        }

        saveToHistory(newResults)

        setAnalyzing(false)
    }

    return (
        <div className="space-y-8">
            {/* Upload Section */}
            <Card className="p-8 border-dashed border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm hover:border-green-500 transition-colors duration-300">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-green-500/10 rounded-full">
                        <Upload className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">Upload Crop Images</h3>
                        <p className="text-gray-400">Supports: All major crops. Drag & drop or select images.</p>
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        Select Files
                    </Button>
                </div>
            </Card>

            {/* History Toggle */}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                    {showHistory ? <ArrowLeft className="w-4 h-4" /> : <History className="w-4 h-4" />}
                    {showHistory ? "Back to Analysis" : "View History"}
                </Button>
            </div>

            {showHistory ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <History className="w-6 h-6 mr-2 text-purple-400" />
                        Analysis History
                    </h2>
                    {history.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-800/30 rounded-xl border border-gray-700">
                            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No analysis history yet. Start analyzing crops to build your history.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {history.map((item) => (
                                <AnalysisCard key={item.id} result={item} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <>

                    {/* Image Grid */}
                    <AnimatePresence>
                        {images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                                {images.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        layout
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="relative group aspect-square rounded-xl overflow-hidden border border-gray-700"
                                    >
                                        <img src={img.url} alt="Crop" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(img.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                        {results.find(r => r.id === img.id) && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-green-400 font-medium">Analyzed</span>
                                                    <Activity className="w-3 h-3 text-green-400" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Bar */}
                    {images.length > 0 && (
                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                onClick={analyzeImages}
                                disabled={analyzing}
                                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                        Analyzing Crops...
                                    </>
                                ) : (
                                    <>
                                        <Sprout className="w-6 h-6 mr-2" />
                                        Start Real-Time Analysis
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {/* Results Section */}
                    {results.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <Activity className="w-6 h-6 mr-2 text-blue-400" />
                                    Live Analysis Feed
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AnimatePresence>
                                        {results.map((result) => (
                                            <AnalysisCard key={result.id} result={result} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                        <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                                        Aggregate Insights
                                    </h2>
                                    <RealTimeChart results={results} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
