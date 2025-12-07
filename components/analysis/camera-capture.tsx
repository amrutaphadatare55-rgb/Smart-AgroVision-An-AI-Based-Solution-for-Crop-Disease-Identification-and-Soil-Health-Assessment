"use client"

import React, { useEffect, useRef, useState } from "react"

export type CapturedPhoto = {
  id: string
  crop: string
  dataUrl: string
  createdAt: number
}

const DEFAULT_CROPS = [
  "Rice",
  "Corn",
  "Wheat",
  "Soybean",
  "Tomato",
  "Potato",
  "Cotton",
]

export function CameraCapture({
  onCapture,
  crops = DEFAULT_CROPS,
}: {
  onCapture?: (p: CapturedPhoto) => void
  crops?: string[]
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  )
  const [selectedCrop, setSelectedCrop] = useState<string>(crops[0])
  const [photos, setPhotos] = useState<CapturedPhoto[]>([])

  useEffect(() => {
    // load persisted photos from localStorage
    try {
      const raw = localStorage.getItem("capturedPhotos")
      if (raw) {
        const parsed: CapturedPhoto[] = JSON.parse(raw)
        setPhotos(parsed)
      }
    } catch (e) {
      console.warn("Failed to load persisted photos", e)
    }

    startCamera()
    return stopCamera
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  async function startCamera() {
    stopCamera()
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      setStream(s)
      if (videoRef.current) videoRef.current.srcObject = s
    } catch (err) {
      console.error("Camera access denied or not available", err)
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
      setStream(null)
    }
  }

  function flipCamera() {
    setFacingMode((f) => (f === "environment" ? "user" : "environment"))
  }

  function capture() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
    const photo: CapturedPhoto = {
      id: Date.now().toString(),
      crop: selectedCrop,
      dataUrl,
      createdAt: Date.now(),
    }
    setPhotos((p) => {
      const updated = [photo, ...p]
      try {
        localStorage.setItem("capturedPhotos", JSON.stringify(updated))
      } catch (e) {
        console.warn("Failed to persist photo", e)
      }
      return updated
    })
    if (onCapture) onCapture(photo)
  }

  function downloadPhoto(photo: CapturedPhoto) {
    const a = document.createElement("a")
    a.href = photo.dataUrl
    a.download = `${photo.crop.toLowerCase()}-${photo.id}.jpg`
    a.click()
  }

  return (
    <section className="max-w-4xl mx-auto my-8 p-6 bg-white/60 rounded-lg shadow-lg backdrop-blur">
      <div className="flex items-start gap-6">
        <div className="w-2/3">
          <div className="relative bg-black rounded overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-72 object-cover bg-black"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-2 rounded border"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={capture}
              className="bg-emerald-600 text-white px-4 py-2 rounded shadow-sm"
            >
              Capture
            </button>

            <button
              onClick={flipCamera}
              className="bg-slate-700 text-white px-3 py-2 rounded"
            >
              Flip
            </button>

            <button
              onClick={stopCamera}
              className="bg-red-600 text-white px-3 py-2 rounded"
            >
              Stop
            </button>
          </div>
        </div>

        <div className="w-1/3">
          <h3 className="text-sm font-medium">Recent Captures</h3>
          <div className="mt-3 grid grid-cols-1 gap-3">
            {photos.length === 0 && (
              <div className="text-sm text-muted-foreground">No photos yet</div>
            )}
            {photos.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 bg-white rounded p-2 shadow"
              >
                <img src={p.dataUrl} alt={p.crop} className="w-16 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.crop}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => downloadPhoto(p)}
                    className="text-xs px-2 py-1 bg-slate-100 rounded"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CameraCapture
