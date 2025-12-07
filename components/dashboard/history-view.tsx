"use client"

import { useState, useEffect } from "react"
import { Calendar, Trash2, Download } from "lucide-react"

interface HistoryItem {
  id: string
  type: "crop" | "soil"
  date: string
  result: string
  confidence: number
}

export function HistoryView() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Mock history data
    const mockHistory: HistoryItem[] = [
      {
        id: "1",
        type: "crop",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        result: "Wheat - Leaf Rust (45% severity)",
        confidence: 94.2,
      },
      {
        id: "2",
        type: "soil",
        date: new Date(Date.now() - 172800000).toLocaleDateString(),
        result: "Loamy Soil - Fertility Score 7.2/10",
        confidence: 88.7,
      },
      {
        id: "3",
        type: "crop",
        date: new Date(Date.now() - 259200000).toLocaleDateString(),
        result: "Rice - Healthy (No disease detected)",
        confidence: 96.1,
      },
    ]
    setHistory(mockHistory)
  }, [])

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  if (history.length === 0) {
    return (
      <div className="bg-color-card border border-color-border rounded-xl p-12 text-center">
        <p className="text-color-muted">No analysis history yet. Start by uploading an image!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-color-card border border-color-border rounded-xl p-6 flex items-center justify-between hover:border-color-primary transition"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.type === "crop"
                    ? "bg-color-primary/20 text-color-primary"
                    : "bg-color-accent/20 text-color-accent"
                }`}
              >
                {item.type === "crop" ? "🌾 Crop" : "🌱 Soil"}
              </span>
              <span className="text-sm text-color-muted flex items-center gap-2">
                <Calendar size={14} />
                {item.date}
              </span>
            </div>
            <p className="font-medium">{item.result}</p>
            <p className="text-xs text-color-muted mt-1">Confidence: {Math.round(item.confidence)}%</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-color-background rounded-lg transition" title="Download">
              <Download size={18} className="text-color-accent" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="p-2 hover:bg-color-background rounded-lg transition"
              title="Delete"
            >
              <Trash2 size={18} className="text-color-error" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
