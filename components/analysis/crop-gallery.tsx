"use client"

import React from "react"
import type { CapturedPhoto } from "./camera-capture"

export function CropGallery({ photos = [] }: { photos?: CapturedPhoto[] }) {
  const grouped = photos.reduce<Record<string, CapturedPhoto[]>>((acc, p) => {
    acc[p.crop] = acc[p.crop] || []
    acc[p.crop].push(p)
    return acc
  }, {})

  const crops = Object.keys(grouped)

  return (
    <section className="max-w-4xl mx-auto my-6 p-6 bg-white/60 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Captured Crop Photos</h3>
      {crops.length === 0 && (
        <div className="text-sm text-muted-foreground">No captured photos yet.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map((crop) => (
          <div key={crop} className="p-4 bg-white rounded shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">{crop}</div>
              <div className="text-sm text-muted-foreground">{grouped[crop].length} photos</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {grouped[crop].map((p) => (
                <div key={p.id} className="aspect-[4/3] overflow-hidden rounded">
                  <img src={p.dataUrl} className="w-full h-full object-cover" alt={`${crop}-${p.id}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CropGallery
