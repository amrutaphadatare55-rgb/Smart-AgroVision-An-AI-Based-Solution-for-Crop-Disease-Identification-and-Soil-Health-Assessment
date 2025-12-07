"use client"

import React, { useState } from "react"
import CameraCapture, { CapturedPhoto } from "./camera-capture"
import CropGallery from "./crop-gallery"

export default function CaptureSection() {
  const [photos, setPhotos] = useState<CapturedPhoto[]>([])
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  function handleCapture(p: CapturedPhoto) {
    setPhotos((s) => [p, ...s])
  }

  return (
    <div id="capture-section" ref={containerRef} className="my-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Crop Photo Capture</h2>
        <p className="text-sm text-muted-foreground mb-4">Use your device camera to take photos of crops (Rice, Corn, etc.).</p>
        <CameraCapture onCapture={handleCapture} />
        <CropGallery photos={photos} />
      </div>
    </div>
  )
}
