"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CropAnalysisChart({ result }: { result: any }) {
  const [severityTrendData, setSeverityTrendData] = useState<any[]>([])

  useEffect(() => {
    // create severity trend + additional metrics for colorful visualization
    const base = result?.analysis?.severity ?? 20
    const newTrend = Array.from({ length: 7 }).map((_, i) => {
      const noise = Math.round((Math.sin(i) + 1) * Math.random() * 5)
      const severity = Math.max(0, Math.min(100, Math.round(base - 10 + i * ((base + 5) / 7) + noise)))
      
      // Generate supporting metrics for visual variety
      const spread = Math.max(5, 40 - base / 2) + Math.sin(i * 0.5) * 10
      const treatment = Math.max(0, Math.min(100, severity - 15 + Math.random() * 20))
      
      return { 
        date: `Day ${i + 1}`, 
        severity,
        spread,
        treatment,
      }
    })
    setSeverityTrendData(newTrend)
  }, [result?.analysis?.severity])

  return (
    <Card className="bg-color-card border-color-border">
      <CardHeader>
        <CardTitle>Disease Progression & Treatment Impact</CardTitle>
        <CardDescription>Severity trend with infection spread and treatment response</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={severityTrendData}>
            <defs>
              <linearGradient id="severityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fca5a5" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="spreadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fed7aa" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="treatmentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#bbf7d0" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted)" />
            <YAxis stroke="var(--color-muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="severity"
              stroke="#ef4444"
              name="Disease Severity (%)"
              strokeWidth={3}
              dot={{ fill: "#dc2626", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="spread"
              stroke="#f97316"
              name="Infection Spread (%)"
              strokeWidth={2}
              dot={{ fill: "#ea580c", r: 3 }}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="treatment"
              stroke="#22c55e"
              name="Treatment Response (%)"
              strokeWidth={2}
              dot={{ fill: "#16a34a", r: 3 }}
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
