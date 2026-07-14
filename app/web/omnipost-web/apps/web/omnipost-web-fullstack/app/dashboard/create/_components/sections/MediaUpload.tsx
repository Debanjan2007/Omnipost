"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Image, Film, FileText, Sticker, X, Crop, Type, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageCropper } from "../ui/ImageCropper"

export interface MediaFile {
    id:      string
    name:    string
    type:    "image" | "video" | "gif" | "document"
    url:     string
    altText: string
    size:    number
}

const TYPE_ICONS = {
    image:    <Image    size={20} className="text-[var(--color-info)]"/>,
    video:    <Film     size={20} className="text-[var(--color-brand-youtube)]"/>,
    gif:      <Sticker  size={20} className="text-[var(--color-success)]"/>,
    document: <FileText size={20} className="text-muted-foreground"/>,
}

function formatSize(bytes: number) {
    return bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(0)} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

interface MediaUploadProps {
    files:    MediaFile[]
    setFiles: (f: MediaFile[]) => void
}

/**
 * MediaUpload — drag & drop zone + thumbnail grid.
 * Simulates upload from dropped files (creates object URLs).
 */
export function MediaUpload({ files, setFiles }: MediaUploadProps) {
    const [dragging, setDragging] = useState(false)
    const [altTarget, setAltTarget] = useState<string | null>(null)
    const [cropTarget, setCropTarget] = useState<MediaFile | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const addFiles = useCallback((incoming: File[]) => {
        const mapped: MediaFile[] = incoming.map(f => ({
            id:      crypto.randomUUID(),
            name:    f.name,
            type:    f.type.startsWith("video") ? "video"
                   : f.type === "image/gif" ? "gif"
                   : f.type.startsWith("image") ? "image"
                   : "document",
            url:     URL.createObjectURL(f),
            altText: "",
            size:    f.size,
        }))
        setFiles([...files, ...mapped])
    }, [files, setFiles])

    function onDrop(e: React.DragEvent) {
        e.preventDefault()
        setDragging(false)
        addFiles(Array.from(e.dataTransfer.files))
    }

    function remove(id: string) {
        setFiles(files.filter(f => f.id !== id))
    }
    function updateAlt(id: string, text: string) {
        setFiles(files.map(f => f.id === id ? { ...f, altText: text } : f))
    }

    const handleSaveCrop = (croppedUrl: string) => {
        if (!cropTarget) return
        setFiles(
            files.map(f => f.id === cropTarget.id ? { ...f, url: croppedUrl } : f)
        )
        setCropTarget(null)
    }

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3.5 border-b border-border/60 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Upload size={14} className="text-muted-foreground"/>
                    Media
                </h3>
                <span className="text-[11px] text-muted-foreground">{files.length} / 10 files</span>
            </div>

            {/* Drop zone */}
            <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "mx-4 my-3 border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all",
                    dragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-border/60 hover:border-primary/40 hover:bg-muted/30",
                )}
            >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload size={18} className="text-primary"/>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                        Drop files here or <span className="text-primary">browse</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                        Images, Videos, GIFs, Documents • Max 50 MB each
                    </p>
                </div>
                {/* Type badges */}
                <div className="flex items-center gap-2">
                    {(["image", "video", "gif", "document"] as const).map(t => (
                        <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-[10px] text-muted-foreground font-medium">
                            {TYPE_ICONS[t]}
                            <span className="capitalize">{t}</span>
                        </span>
                    ))}
                </div>
                <input ref={inputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" className="hidden"
                    onChange={e => addFiles(Array.from(e.target.files ?? []))}/>
            </div>

            {/* Thumbnails */}
            {files.length > 0 && (
                <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
                    {files.map(f => (
                        <div key={f.id} className="relative group rounded-xl border border-border overflow-hidden bg-muted/30">
                            {/* Preview */}
                            {f.type === "image" || f.type === "gif" ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={f.url} alt={f.altText || f.name} className="w-full aspect-square object-cover"/>
                            ) : (
                                <div className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 p-2">
                                    {TYPE_ICONS[f.type]}
                                    <span className="text-[10px] text-muted-foreground truncate max-w-full px-1">{f.name}</span>
                                    <span className="text-[10px] text-muted-foreground/60">{formatSize(f.size)}</span>
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 rounded-xl">
                                <button onClick={() => setAltTarget(altTarget === f.id ? null : f.id)}
                                    className="w-7 h-7 bg-card rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Alt text">
                                    <Type size={12}/>
                                </button>
                                {f.type === "image" && (
                                    <button
                                        onClick={() => setCropTarget(f)}
                                        className="w-7 h-7 bg-card rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                                        title="Crop Image"
                                    >
                                        <Crop size={12}/>
                                    </button>
                                )}
                                <button className="w-7 h-7 bg-card rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Replace">
                                    <RotateCcw size={12}/>
                                </button>
                                <button onClick={() => remove(f.id)}
                                    className="w-7 h-7 bg-card rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 text-destructive transition-colors" title="Delete">
                                    <X size={12}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Alt text inline editor */}
            {altTarget && (
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl border border-border/60">
                        <Type size={13} className="text-muted-foreground shrink-0"/>
                        <input
                            type="text"
                            placeholder="Describe this media for screen readers…"
                            value={files.find(f => f.id === altTarget)?.altText ?? ""}
                            onChange={e => updateAlt(altTarget, e.target.value)}
                            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                        />
                        <button onClick={() => setAltTarget(null)} className="shrink-0"><X size={13} className="text-muted-foreground"/></button>
                    </div>
                </div>
            )}

            {/* Image Cropper Modal */}
            {cropTarget && (
                <ImageCropper
                    file={cropTarget}
                    onClose={() => setCropTarget(null)}
                    onSave={handleSaveCrop}
                />
            )}
        </div>
    )
}
