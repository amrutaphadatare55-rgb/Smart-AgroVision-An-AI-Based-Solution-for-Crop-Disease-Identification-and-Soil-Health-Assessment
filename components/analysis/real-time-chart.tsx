"use client"

import { Card } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
} from "recharts"

interface AnalysisResult {
    id: string
    cropType: string
    confidence: number
    disease: string
    diseaseConfidence: number
    severity: number
}

export function RealTimeChart({ results }: { results: AnalysisResult[] }) {
    // Aggregate data for charts
    const diseaseCount = results.reduce((acc, curr) => {
        acc[curr.disease] = (acc[curr.disease] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const pieData = Object.entries(diseaseCount).map(([name, value]) => ({
        name,
        value,
    }))

    const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"]

    // Average severity by crop
    const severityByCrop = results.reduce((acc, curr) => {
        if (!acc[curr.cropType]) {
            acc[curr.cropType] = { total: 0, count: 0 }
        }
        acc[curr.cropType].total += curr.severity
        acc[curr.cropType].count += 1
        return acc
    }, {} as Record<string, { total: number; count: number }>)

    const barData = Object.entries(severityByCrop).map(([name, data]) => ({
        name,
        severity: data.total / data.count,
    }))

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gray-900/40 backdrop-blur-md border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Disease Distribution</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {pieData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center text-xs text-gray-300">
                            <div
                                className="w-3 h-3 rounded-full mr-1"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {entry.name} ({entry.value})
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 bg-gray-900/40 backdrop-blur-md border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Avg Severity by Crop</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                            <YAxis stroke="#9CA3AF" fontSize={12} />
                            <Tooltip
                                cursor={{ fill: '#374151', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Bar dataKey="severity" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    )
}
