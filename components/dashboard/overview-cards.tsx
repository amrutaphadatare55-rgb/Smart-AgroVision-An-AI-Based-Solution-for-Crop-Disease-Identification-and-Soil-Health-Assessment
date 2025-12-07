"use client"

import React, { useEffect, useState } from "react"

function Sparkline({ values = [] }: { values?: number[] }) {
  const width = 120
  const height = 28
  if (values.length === 0) return <svg width={width} height={height} />
  const max = Math.max(...values)
  const min = Math.min(...values)
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width
      const y = height - ((v - min) / (max - min || 1)) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={width} height={height} className="block">
      <polyline
        fill="none"
        stroke="#16a34a"
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function OverviewCards() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem("capturedPhotos")
      const parsed = raw ? (JSON.parse(raw) as any[]) : []
      const agg: Record<string, number> = { Total: parsed.length }
      parsed.forEach((p) => {
        agg[p.crop] = (agg[p.crop] || 0) + 1
      })
      setCounts(agg)
    } catch (e) {
      console.warn("Failed to load counts", e)
    }
  }, [])

  const sampleTrend = [2, 3, 4, 6, 5, 7, 9]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-white/80 rounded-lg shadow">
        <div className="text-sm text-color-muted">Total Captures</div>
        <div className="text-2xl font-bold">{counts.Total ?? 0}</div>
        <div className="mt-2">
          <Sparkline values={sampleTrend} />
        </div>
      </div>

      {['Rice','Corn','Wheat'].map((crop) => (
        <div key={crop} className="p-4 bg-white/80 rounded-lg shadow">
          <div className="text-sm text-color-muted">{crop}</div>
          <div className="text-xl font-semibold">{counts[crop] ?? 0}</div>
          <div className="mt-2">
            <Sparkline values={sampleTrend.map((v) => Math.max(1, Math.floor(v * Math.random()))) } />
          </div>
        </div>
      ))}
    </div>
  )
}
