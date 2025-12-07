"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NutrientChart({ result }: { result: any }) {
  const npkData = [
    { nutrient: "Nitrogen (N)", value: result.analysis.npk.n },
    { nutrient: "Phosphorus (P)", value: result.analysis.npk.p },
    { nutrient: "Potassium (K)", value: result.analysis.npk.k },
  ]

  return (
    <Card className="bg-color-card border-color-border">
      <CardHeader>
        <CardTitle>NPK Nutrient Profile</CardTitle>
        <CardDescription>Primary nutrient composition (mg/kg)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={npkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="nutrient" stroke="var(--color-muted)" />
            <YAxis stroke="var(--color-muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" name="Level (mg/kg)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
