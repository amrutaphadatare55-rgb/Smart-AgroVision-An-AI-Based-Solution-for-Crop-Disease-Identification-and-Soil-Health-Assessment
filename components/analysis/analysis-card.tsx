"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, AlertOctagon, Droplets } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
    id: string
    cropType: string
    confidence: number
    disease: string
    diseaseConfidence: number
    severity: number
    timestamp: string
}

export function AnalysisCard({ result }: { result: AnalysisResult }) {
    const isHealthy = result.disease === "Healthy"
    const severityColor = isHealthy
        ? "bg-green-500"
        : result.severity < 30
            ? "bg-yellow-500"
            : "bg-red-500"

    const StatusIcon = isHealthy ? CheckCircle : result.severity < 50 ? AlertCircle : AlertOctagon

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden bg-gray-900/40 backdrop-blur-md border-gray-700 hover:border-gray-500 transition-all duration-300">
                <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">{result.cropType}</h3>
                            <p className="text-xs text-gray-400">
                                Confidence: {isNaN(result.confidence) ? "N/A" : (result.confidence * 100).toFixed(1)}%
                            </p>
                        </div>
                        <div className={`p-2 rounded-full ${isHealthy ? "bg-green-500/20" : "bg-red-500/20"}`}>
                            <StatusIcon className={`w-5 h-5 ${isHealthy ? "text-green-400" : "text-red-400"}`} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Condition</span>
                                <span className={`font-medium ${isHealthy ? "text-green-400" : "text-red-400"}`}>
                                    {result.disease}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.diseaseConfidence * 100}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
                                />
                            </div>
                        </div>

                        {!isHealthy && (
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Severity</span>
                                    <span className="text-gray-300">{result.severity.toFixed(1)}%</span>
                                </div>
                                <Progress value={result.severity} className="h-2 bg-gray-700" indicatorClassName={severityColor} />
                            </div>
                        )}

                        <div className="pt-4 mt-4 border-t border-gray-700/50 flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center">
                                <Droplets className="w-3 h-3 mr-1" />
                                Humidity: 65% (Est.)
                            </span>
                            <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
