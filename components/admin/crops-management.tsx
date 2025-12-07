"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

interface Crop {
  id: string
  name: string
  scientificName: string
  growthDays: number
}

export function CropsManagement() {
  const [crops, setCrops] = useState<Crop[]>([
    { id: "1", name: "Wheat", scientificName: "Triticum aestivum", growthDays: 120 },
    { id: "2", name: "Rice", scientificName: "Oryza sativa", growthDays: 150 },
    { id: "3", name: "Corn", scientificName: "Zea mays", growthDays: 110 },
    { id: "4", name: "Soybean", scientificName: "Glycine max", growthDays: 140 },
  ])

  const [newCrop, setNewCrop] = useState({ name: "", scientificName: "", growthDays: "" })

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.scientificName && newCrop.growthDays) {
      setCrops((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...newCrop,
          growthDays: Number.parseInt(newCrop.growthDays),
        },
      ])
      setNewCrop({ name: "", scientificName: "", growthDays: "" })
    }
  }

  const handleDeleteCrop = (id: string) => {
    setCrops((prev) => prev.filter((crop) => crop.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-color-card border border-color-border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-lg">Add New Crop</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Crop Name"
            value={newCrop.name}
            onChange={(e) => setNewCrop((prev) => ({ ...prev, name: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Scientific Name"
            value={newCrop.scientificName}
            onChange={(e) => setNewCrop((prev) => ({ ...prev, scientificName: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
          <input
            type="number"
            placeholder="Growth Days"
            value={newCrop.growthDays}
            onChange={(e) => setNewCrop((prev) => ({ ...prev, growthDays: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
        </div>
        <button
          onClick={handleAddCrop}
          className="w-full py-2 rounded-lg bg-color-primary text-color-background font-semibold hover:bg-color-primary-light transition flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Crop
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Existing Crops</h3>
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-color-card border border-color-border rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-bold">{crop.name}</p>
              <p className="text-sm text-color-muted">{crop.scientificName}</p>
              <p className="text-xs text-color-muted mt-2">Growth: {crop.growthDays} days</p>
            </div>
            <button
              onClick={() => handleDeleteCrop(crop.id)}
              className="p-2 hover:bg-color-background rounded-lg transition text-color-error"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
