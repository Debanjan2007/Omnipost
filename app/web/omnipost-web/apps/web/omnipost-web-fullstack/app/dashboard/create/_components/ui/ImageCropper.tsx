"use client"

import { useState, useRef, useEffect } from "react"
import { X, Crop, Move, ZoomIn, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MediaFile } from "../sections/MediaUpload"

interface ImageCropperProps {
    file: MediaFile
    onClose: () => void
    onSave: (croppedImageUrl: string) => void
}

type AspectRatio = "1:1" | "4:5" | "16:9" | "free"

const ASPECT_RATIO_PRESETS: { label: string; value: AspectRatio; ratio: number }[] = [
    { label: "Square (1:1)", value: "1:1", ratio: 1 },
    { label: "Portrait (4:5)", value: "4:5", ratio: 0.8 },
    { label: "Landscape (16:9)", value: "16:9", ratio: 16 / 9 },
    { label: "Free", value: "free", ratio: 0 },
]

export function ImageCropper({ file, onClose, onSave }: ImageCropperProps) {
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1")
    const [zoom, setZoom] = useState(1)
    const [panX, setPanX] = useState(0)
    const [panY, setPanY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [imageLoaded, setImageLoaded] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Reset pans when ratio or zoom changes
    useEffect(() => {
        setPanX(0)
        setPanY(0)
    }, [aspectRatio])

    // Handle mouse drag to pan
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDragging(true)
        setDragStart({ x: e.clientX - panX, y: e.clientY - panY })
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        setPanX(e.clientX - dragStart.x)
        setPanY(e.clientY - dragStart.y)
    };

    const handleMouseUp = () => {
        setIsDragging(false)
    };

    // Touch support for mobile panning
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return
        setIsDragging(true)
        setDragStart({
            x: e.touches[0].clientX - panX,
            y: e.touches[0].clientY - panY,
        })
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return
        setPanX(e.touches[0].clientX - dragStart.x)
        setPanY(e.touches[0].clientY - dragStart.y)
    };

    const handleReset = () => {
        setZoom(1)
        setPanX(0)
        setPanY(0)
    }

    const handleCrop = () => {
        const image = imgRef.current
        const canvas = canvasRef.current
        if (!image || !canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Presets configuration
        const targetPreset = ASPECT_RATIO_PRESETS.find(p => p.value === aspectRatio)
        const ratio = targetPreset ? targetPreset.ratio : 1

        // Define output size
        const outputWidth = 800
        const outputHeight = ratio ? Math.round(outputWidth / ratio) : Math.round(outputWidth * (image.naturalHeight / image.naturalWidth))

        canvas.width = outputWidth
        canvas.height = outputHeight

        // Fill background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, outputWidth, outputHeight)

        // Draw image onto canvas applying zoom and pan translations
        // 1. Center coordinates of output canvas
        ctx.translate(outputWidth / 2, outputHeight / 2)

        // 2. Apply Pan adjusted for crop ratio scale
        // Find display dimension of container
        const viewWidth = containerRef.current?.clientWidth || 300
        const viewHeight = containerRef.current?.clientHeight || 300
        const scaleFactor = outputWidth / viewWidth

        ctx.translate(panX * scaleFactor, panY * scaleFactor)

        // 3. Apply Zoom
        ctx.scale(zoom, zoom)

        // 4. Draw image centered
        // We need to keep aspect ratio of the drawn image relative to container fit
        const imgRatio = image.naturalWidth / image.naturalHeight
        let drawW = outputWidth
        let drawH = outputWidth / imgRatio

        if (aspectRatio === "free") {
            drawW = outputWidth
            drawH = outputHeight
        } else {
            // Match container cover style logic
            const containerRatio = viewWidth / viewHeight
            if (imgRatio > containerRatio) {
                drawH = viewHeight * scaleFactor
                drawW = drawH * imgRatio
            } else {
                drawW = viewWidth * scaleFactor
                drawH = drawW / imgRatio
            }
        }

        ctx.drawImage(image, -drawW / 2, -drawH / 2, drawW, drawH)

        // Generate data URL or Object URL
        canvas.toBlob((blob) => {
            if (blob) {
                const croppedUrl = URL.createObjectURL(blob)
                onSave(croppedUrl)
            }
        }, "image/jpeg", 0.95)
    }

    // Determine container aspect ratio class
    const ratioPreset = ASPECT_RATIO_PRESETS.find(p => p.value === aspectRatio)
    const containerStyle = ratioPreset && ratioPreset.ratio
        ? { aspectRatio: `${ratioPreset.ratio}` }
        : { aspectRatio: `${file.type === "image" ? 1 : 16 / 9}` }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between shrink-0">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Crop size={14} className="text-primary" />
                        Crop Image
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Viewport/Drag Area */}
                <div className="flex-1 bg-muted/30 p-6 flex items-center justify-center overflow-hidden min-h-[250px] relative">
                    <div
                        ref={containerRef}
                        style={containerStyle}
                        className={cn(
                            "w-full max-w-xs max-h-[300px] border border-dashed border-primary/40 rounded-xl overflow-hidden relative bg-black/40 cursor-grab active:cursor-grabbing select-none transition-all",
                            isDragging && "cursor-grabbing border-primary"
                        )}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                    >
                        {/* Interactive image layer */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imgRef}
                            src={file.url}
                            alt="Crop target"
                            onLoad={() => setImageLoaded(true)}
                            className={cn(
                                "w-full h-full object-cover transition-transform duration-75 pointer-events-none select-none",
                                !imageLoaded && "opacity-0"
                            )}
                            style={{
                                transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                            }}
                        />

                        {/* Interactive Grid Overlay for professional look */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                            <div className="border-r border-b border-white/20"></div>
                            <div className="border-r border-b border-white/20"></div>
                            <div className="border-b border-white/20"></div>
                            <div className="border-r border-b border-white/20"></div>
                            <div className="border-r border-b border-white/20"></div>
                            <div className="border-b border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                            <div></div>
                        </div>

                        {/* Center Drag Indicator helper icon */}
                        <div className="absolute bottom-2 right-2 bg-black/60 rounded-lg p-1 text-white/80 pointer-events-none">
                            <Move size={12} />
                        </div>
                    </div>
                </div>

                {/* Controls Area */}
                <div className="p-4 border-t border-border/60 space-y-4 bg-muted/10 shrink-0">
                    {/* Presets Selector */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] text-muted-foreground font-medium">Aspect Ratio Presets</label>
                        <div className="flex gap-1.5 overflow-x-auto pb-1">
                            {ASPECT_RATIO_PRESETS.map((preset) => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => setAspectRatio(preset.value)}
                                    className={cn(
                                        "text-xs px-2.5 py-1.5 rounded-lg border border-border/80 font-medium whitespace-nowrap transition-all",
                                        aspectRatio === preset.value
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Zoom Slider */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                                <ZoomIn size={11} /> Zoom Scale
                            </label>
                            <span className="text-[11px] font-mono text-muted-foreground">{zoom.toFixed(1)}x</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={zoom}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                            />
                            <button
                                type="button"
                                onClick={handleReset}
                                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                title="Reset Crop Grid"
                            >
                                <RefreshCw size={12} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-4 py-3 border-t border-border/60 bg-card flex justify-end gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 px-3 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleCrop}
                        className="h-8 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 transition-all shadow-sm"
                    >
                        Apply Crop
                    </button>
                </div>

                {/* Hidden canvas for performing crop calculations */}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    )
}
