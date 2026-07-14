"use client"

import { useState } from "react"
import { GalleryHorizontal, Plus, GripVertical, X } from "lucide-react"
import type { MediaFile } from "./MediaUpload"
import { cn } from "@/lib/utils"

interface CarouselManagerProps {
    files:    MediaFile[]
    setFiles: (f: MediaFile[]) => void
}

/**
 * CarouselManager — shown only when 2+ images exist.
 * Displays numbered slides in a horizontal row with drag-to-reorder hint.
 */
export function CarouselManager({ files, setFiles }: CarouselManagerProps) {
    const images = files.filter(f => f.type === "image" || f.type === "gif")
    const [dragging, setDragging] = useState<number | null>(null)
    const [over,     setOver]     = useState<number | null>(null)

    if (images.length < 2) return null

    function onDragStart(i: number) { setDragging(i) }
    function onDragOver(e: React.DragEvent, i: number) { e.preventDefault(); setOver(i) }
    function onDrop(i: number) {
        if (dragging === null || dragging === i) { setDragging(null); setOver(null); return }
        const reordered = [...files]
        const [item] = reordered.splice(dragging, 1)
        reordered.splice(i, 0, item)
        setFiles(reordered)
        setDragging(null)
        setOver(null)
    }

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <GalleryHorizontal size={14} className="text-muted-foreground"/>
                    Carousel Order
                </h3>
                <span className="text-[11px] text-muted-foreground">{images.length} slides · drag to reorder</span>
            </div>

            {/* Slides row */}
            <div className="p-4 flex gap-2.5 overflow-x-auto pb-3">
                {images.map((f, i) => (
                    <div
                        key={f.id}
                        draggable
                        onDragStart={() => onDragStart(i)}
                        onDragOver={e  => onDragOver(e, i)}
                        onDrop={() => onDrop(i)}
                        onDragEnd={() => { setDragging(null); setOver(null) }}
                        className={cn(
                            "relative shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden cursor-grab active:cursor-grabbing transition-all",
                            over === i && dragging !== i ? "border-primary scale-105" : "border-border",
                            dragging === i && "opacity-40",
                        )}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={f.url} alt="" className="w-full h-full object-cover"/>
                        {/* Slide number */}
                        <div className="absolute top-1 left-1 w-5 h-5 bg-foreground/70 rounded-md flex items-center justify-center text-[10px] text-background font-bold">
                            {i + 1}
                        </div>
                        {/* Drag handle */}
                        <div className="absolute bottom-1 right-1 opacity-60">
                            <GripVertical size={12} className="text-white drop-shadow"/>
                        </div>
                    </div>
                ))}

                {/* Add more */}
                <button className="shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-1 transition-all">
                    <Plus size={16} className="text-muted-foreground"/>
                    <span className="text-[10px] text-muted-foreground">Add</span>
                </button>
            </div>
        </div>
    )
}
