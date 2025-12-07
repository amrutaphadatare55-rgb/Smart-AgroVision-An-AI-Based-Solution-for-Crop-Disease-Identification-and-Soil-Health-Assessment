Camera capture UI

This folder contains small components for capturing crop photos from the browser camera and displaying them in a simple gallery.

Files:
- `camera-capture.tsx`: Camera UI using `getUserMedia`, crop selector, capture, and download.
- `crop-gallery.tsx`: Shows captured photos grouped by crop name.

Usage:
- Import `CameraCapture` and `CropGallery` into a page and wire `onCapture` to collect photos in state.

Notes:
- These components run in the browser and require `"use client"` at the top of the files.
- They store photos in-memory only (no server persistence).
