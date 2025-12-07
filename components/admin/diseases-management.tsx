"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

interface Disease {
  id: string
  name: string
  cropType: string
  symptoms: string
}

export function DiseasesManagement() {
  const [diseases, setDiseases] = useState<Disease[]>([
    { id: "1", name: "Leaf Rust", cropType: "Wheat", symptoms: "Brown/orange pustules on leaves" },
    { id: "2", name: "Blast", cropType: "Rice", symptoms: "Gray/white lesions on leaves" },
    { id: "3", name: "Corn Blight", cropType: "Corn", symptoms: "Rectangular necrotic lesions" },
  ])

  const [newDisease, setNewDisease] = useState({ name: "", cropType: "", symptoms: "" })

  const handleAddDisease = () => {
    if (newDisease.name && newDisease.cropType && newDisease.symptoms) {
      setDiseases((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...newDisease,
        },
      ])
      setNewDisease({ name: "", cropType: "", symptoms: "" })
    }
  }

  const handleDeleteDisease = (id: string) => {
    setDiseases((prev) => prev.filter((disease) => disease.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-color-card border border-color-border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-lg">Add New Disease</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Disease Name"
            value={newDisease.name}
            onChange={(e) => setNewDisease((prev) => ({ ...prev, name: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Crop Type"
            value={newDisease.cropType}
            onChange={(e) => setNewDisease((prev) => ({ ...prev, cropType: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Symptoms"
            value={newDisease.symptoms}
            onChange={(e) => setNewDisease((prev) => ({ ...prev, symptoms: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-color-background border border-color-border focus:border-color-primary focus:outline-none"
          />
        </div>
        <button
          onClick={handleAddDisease}
          className="w-full py-2 rounded-lg bg-color-primary text-color-background font-semibold hover:bg-color-primary-light transition flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Add Disease
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Existing Diseases</h3>
        {diseases.map((disease) => (
          <div
            key={disease.id}
            className="bg-color-card border border-color-border rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-bold">{disease.name}</p>
              <p className="text-sm text-color-muted">Crop: {disease.cropType}</p>
              <p className="text-xs text-color-muted mt-2">Symptoms: {disease.symptoms}</p>
            </div>
            <button
              onClick={() => handleDeleteDisease(disease.id)}
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
