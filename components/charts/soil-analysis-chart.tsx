"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SoilAnalysisChart({ result }: { result: any }) {
  const micronutrientData = [
    { nutrient: "Iron", value: result.analysis.micronutrients.iron },
    { nutrient: "Zinc", value: result.analysis.micronutrients.zinc },
    { nutrient: "Manganese", value: result.analysis.micronutrients.manganese },
    { nutrient: "Copper", value: result.analysis.micronutrients.copper },
  ]

  return (
    <Card className="bg-color-card border-color-border">
      <CardHeader>
        <CardTitle>Micronutrient Levels</CardTitle>
        <CardDescription>Soil composition analysis (mg/kg)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={micronutrientData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="nutrient" stroke="var(--color-muted)" />
            <YAxis stroke="var(--color-muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar dataKey="value" fill="var(--color-accent)" name="Level (mg/kg)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
