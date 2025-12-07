"use client"

import React, { useEffect, useState } from "react"

type Photo = {
  id: string
  crop: string
  dataUrl: string
  createdAt: number
}

export default function RecentCaptures({ limit = 8 }: { limit?: number }) {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("capturedPhotos")
      const parsed: Photo[] = raw ? JSON.parse(raw) : []
      setPhotos(parsed.slice(0, limit))
    } catch (e) {
      console.warn("Failed to load recent captures", e)
    }
  }, [limit])

  if (photos.length === 0) {
    return (
      <div className="p-4 bg-white/60 rounded shadow text-sm text-color-muted">No recent captures available.</div>
    )
  }

  return (
    <div className="p-4 bg-white/60 rounded shadow">
      <h3 className="font-medium mb-3">Recent Captures</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {photos.map((p) => (
          <div key={p.id} className="rounded overflow-hidden bg-white">
            <img src={p.dataUrl} alt={p.crop} className="w-full h-28 object-cover" />
            <div className="p-2 text-xs">
              <div className="font-medium">{p.crop}</div>
              <div className="text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
