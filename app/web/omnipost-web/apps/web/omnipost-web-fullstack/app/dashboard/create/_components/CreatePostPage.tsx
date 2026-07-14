"use client"

import { useState, useEffect, useCallback } from "react"
import { Sparkles } from "lucide-react"

import { CreateHeader }     from "./CreateHeader"
import { PostComposer }     from "./sections/PostComposer"
import { MediaUpload }      from "./sections/MediaUpload"
import { LinkPreview }      from "./sections/LinkPreview"
import { CarouselManager }  from "./sections/CarouselManager"
import { PollCreator }      from "./sections/PollCreator"
import { LocationTags }     from "./sections/LocationTags"
import { PlatformsPanel }   from "./sections/PlatformsPanel"
import { SchedulingPanel }  from "./sections/SchedulingPanel"
import { AudiencePanel }    from "./sections/AudiencePanel"
import { WarningsPanel }    from "./sections/WarningsPanel"
import { AIPanel }          from "./sections/AIPanel"
import { SEOPanel }         from "./sections/SEOPanel"
import { ChecklistPanel }   from "./sections/ChecklistPanel"
import { PlatformPreviews } from "./sections/PlatformPreviews"
import { DEFAULT_SELECTED } from "./data/platforms"
import type { MediaFile }   from "./sections/MediaUpload"

// ─── URL detector ─────────────────────────────────────────────────────────────

function detectUrl(text: string): string {
    const match = text.match(/https?:\/\/[^\s]+/)
    return match ? match[0] : ""
}

// ─── Right panel group ────────────────────────────────────────────────────────
// Renders all right-column panels. Used twice: desktop aside + mobile inline.

function RightPanels({
    selected, setSelected, content, files, scheduledDate, tags,
}: {
    selected:      Set<string>
    setSelected:   (s: Set<string>) => void
    content:       string
    files:         MediaFile[]
    scheduledDate: string
    tags:          string[]
}) {
    return (
        <div className="space-y-3">
            <PlatformsPanel selected={selected} setSelected={setSelected}/>
            <SchedulingPanel/>
            <AudiencePanel/>
            <WarningsPanel selected={selected} charCount={content.length}/>
            <AIPanel content={content} setContent={() => {}}/>
            <SEOPanel/>
            <ChecklistPanel
                content={content}
                files={files}
                selected={selected}
                scheduledDate={scheduledDate}
                tags={tags}
            />
        </div>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * CreatePostPage — main client orchestrator for the Create Post experience.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────────────────┐
 *   │                 CreateHeader                 │
 *   ├──────────────────────────┬───────────────────┤
 *   │  Left (flex-1)           │  Right (w-80+)    │
 *   │  ·PostComposer           │  ·PlatformsPanel  │
 *   │  ·MediaUpload            │  ·SchedulingPanel │
 *   │  ·LinkPreview            │  ·AudiencePanel   │
 *   │  ·CarouselManager        │  ·WarningsPanel   │
 *   │  ·PollCreator            │  ·AIPanel         │
 *   │  ·LocationTags           │  ·SEOPanel        │
 *   │  ·PlatformPreviews       │  ·ChecklistPanel  │
 *   └──────────────────────────┴───────────────────┘
 *
 * Mobile: single column, all sections stacked, right panels after left.
 */
export function CreatePostPage() {
    // ── Shared state ──────────────────────────────────────────────────────────
    const [content,       setContent]       = useState("")
    const [files,         setFiles]         = useState<MediaFile[]>([])
    const [selected,      setSelected]      = useState<Set<string>>(DEFAULT_SELECTED)
    const [location,      setLocation]      = useState("")
    const [tags,          setTags]          = useState<string[]>(["socialmedia", "marketing"])
    const [scheduledDate, setScheduledDate] = useState("")
    const [savedStatus,   setSavedStatus]   = useState<"idle" | "saving" | "saved">("idle")
    const [aiOpen,        setAiOpen]        = useState(false)

    // ── Auto-save simulation ──────────────────────────────────────────────────
    useEffect(() => {
        if (!content) return
        setSavedStatus("saving")
        const t = setTimeout(() => setSavedStatus("saved"), 1500)
        return () => clearTimeout(t)
    }, [content])

    const detectedUrl = detectUrl(content)

    return (
        <div className="h-full flex flex-col overflow-hidden">

            {/* ── Header ──────────────────────────────────────────── */}
            <CreateHeader
                savedStatus={savedStatus}
                onPublish={() => alert("Publishing…")}
                onSchedule={() => {}}
                onDraft={() => setSavedStatus("saved")}
                onPreview={() => {}}
            />

            {/* ── Body ────────────────────────────────────────────── */}
            <div className="flex-1 flex overflow-hidden min-h-0">

                {/* ── Left column ─────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto min-w-0">
                    <div className="p-4 sm:p-5 lg:p-6 space-y-4 max-w-3xl mx-auto lg:max-w-none">

                        <PostComposer
                            content={content}
                            setContent={setContent}
                            savedStatus={savedStatus}
                        />

                        <MediaUpload files={files} setFiles={setFiles}/>

                        {detectedUrl && <LinkPreview url={detectedUrl}/>}

                        <CarouselManager files={files} setFiles={setFiles}/>

                        <PollCreator/>

                        <LocationTags
                            location={location}
                            setLocation={setLocation}
                            tags={tags}
                            setTags={setTags}
                        />

                        {/* ── Mobile-only: publishing panels ───────── */}
                        <div className="lg:hidden">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-2">
                                Publishing Settings
                            </p>
                            <RightPanels
                                selected={selected}
                                setSelected={setSelected}
                                content={content}
                                files={files}
                                scheduledDate={scheduledDate}
                                tags={tags}
                            />
                        </div>

                        <PlatformPreviews
                            content={content}
                            files={files}
                            selected={selected}
                        />

                        {/* Bottom spacer for floating button clearance */}
                        <div className="h-20"/>
                    </div>
                </div>

                {/* ── Right column — desktop ───────────────────────── */}
                <aside className="hidden lg:flex flex-col w-[320px] xl:w-[360px] shrink-0 border-l border-border overflow-y-auto">
                    <div className="p-4 space-y-3 pb-24">
                        <RightPanels
                            selected={selected}
                            setSelected={setSelected}
                            content={content}
                            files={files}
                            scheduledDate={scheduledDate}
                            tags={tags}
                        />
                    </div>
                </aside>
            </div>

            {/* ── Floating AI button ───────────────────────────────── */}
            <button
                onClick={() => setAiOpen(!aiOpen)}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                title="AI Assistant"
            >
                <Sparkles size={20}/>
            </button>

            {/* ── AI overlay ───────────────────────────────────────── */}
            {aiOpen && (
                <div
                    className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
                    onClick={() => setAiOpen(false)}
                >
                    <div
                        className="absolute bottom-20 right-4 sm:right-6 w-[340px] sm:w-[380px]"
                        onClick={e => e.stopPropagation()}
                    >
                        <AIPanel content={content} setContent={setContent}/>
                    </div>
                </div>
            )}
        </div>
    )
}
