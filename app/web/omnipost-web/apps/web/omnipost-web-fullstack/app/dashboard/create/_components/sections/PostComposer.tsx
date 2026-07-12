"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
    Smile, Hash, AtSign, Sparkles, Code2, Undo2, Redo2,
    AlignLeft, Check, Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Emoji picker (simple grid) ───────────────────────────────────────────────

const EMOJIS = ["😀","😂","🔥","💡","🎯","✨","🚀","💪","👀","❤️","🙌","💬","📢","🎉","⚡","🌟"]

function EmojiPicker({ onPick }: { onPick: (e: string) => void }) {
    return (
        <div className="absolute top-10 left-0 z-30 bg-card border border-border rounded-xl shadow-lg p-2 grid grid-cols-8 gap-0.5">
            {EMOJIS.map(e => (
                <button key={e} type="button" onClick={() => onPick(e)}
                    className="w-7 h-7 text-base hover:bg-muted rounded-lg flex items-center justify-center">
                    {e}
                </button>
            ))}
        </div>
    )
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

function TBtn({ icon, label, active, onClick, disabled }: {
    icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; disabled?: boolean
}) {
    return (
        <button type="button" onClick={onClick} disabled={disabled} title={label}
            className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-bold",
                active && "bg-primary/10 text-primary hover:bg-primary/15",
                disabled && "opacity-30 cursor-not-allowed",
            )}>
            {icon}
        </button>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface PostComposerProps {
    content:    string
    setContent: (c: string) => void
    savedStatus: "idle" | "saving" | "saved"
}

/**
 * PostComposer — the primary text editor with toolbar.
 * Auto-grows to fit content. Toolbar handles emoji, hashtag, mentions,
 * AI, markdown, undo/redo. Footer shows char count + reading time.
 */
export function PostComposer({ content, setContent, savedStatus }: PostComposerProps) {
    const textareaRef  = useRef<HTMLTextAreaElement>(null)
    const [showEmoji,  setShowEmoji]  = useState(false)
    const [markdown,   setMarkdown]   = useState(false)
    const [history,    setHistory]    = useState<string[]>([""])
    const [histIdx,    setHistIdx]    = useState(0)

    // Auto-resize textarea
    const resize = useCallback(() => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }, [])

    useEffect(resize, [content, resize])

    function pushHistory(val: string) {
        const next = history.slice(0, histIdx + 1)
        next.push(val)
        setHistory(next)
        setHistIdx(next.length - 1)
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const val = e.target.value
        setContent(val)
        pushHistory(val)
    }

    function undo() {
        if (histIdx === 0) return
        const ni = histIdx - 1
        setHistIdx(ni)
        setContent(history[ni])
    }
    function redo() {
        if (histIdx >= history.length - 1) return
        const ni = histIdx + 1
        setHistIdx(ni)
        setContent(history[ni])
    }

    function insertAtCursor(text: string) {
        const el = textareaRef.current
        if (!el) return
        const start = el.selectionStart
        const end   = el.selectionEnd
        const next  = content.slice(0, start) + text + content.slice(end)
        setContent(next)
        pushHistory(next)
        setTimeout(() => {
            el.selectionStart = el.selectionEnd = start + text.length
            el.focus()
        }, 0)
    }

    const charCount    = content.length
    const wordCount    = content.trim() ? content.trim().split(/\s+/).length : 0
    const readingTime  = Math.max(1, Math.ceil(wordCount / 200))
    const twitterWarn  = charCount > 240

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">

            {/* ── Toolbar ──────────────────────────────────────────── */}
            <div className="flex items-center gap-0.5 px-3 py-2.5 border-b border-border/60 flex-wrap">
                <div className="relative">
                    <TBtn icon={<Smile size={14}/>} label="Emoji" onClick={() => setShowEmoji(!showEmoji)} active={showEmoji}/>
                    {showEmoji && <EmojiPicker onPick={e => { insertAtCursor(e); setShowEmoji(false) }}/>}
                </div>
                <TBtn icon={<Hash size={14}/>}       label="Hashtags"   onClick={() => insertAtCursor(" #")}/>
                <TBtn icon={<AtSign size={14}/>}     label="Mentions"   onClick={() => insertAtCursor(" @")}/>
                <TBtn icon={<Sparkles size={14}/>}   label="AI assist"  onClick={() => {}}/>
                <TBtn icon={<Code2 size={14}/>}      label="Markdown"   onClick={() => setMarkdown(!markdown)} active={markdown}/>

                <div className="w-px h-4 bg-border/60 mx-1"/>

                <TBtn icon={<Undo2 size={13}/>}  label="Undo" onClick={undo} disabled={histIdx === 0}/>
                <TBtn icon={<Redo2 size={13}/>}  label="Redo" onClick={redo} disabled={histIdx >= history.length - 1}/>

                {/* Auto-save badge pushed to the right */}
                <div className="ml-auto flex items-center gap-1.5 text-[11px]">
                    {savedStatus === "saving" && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                            <Loader2 size={11} className="animate-spin"/> Saving…
                        </span>
                    )}
                    {savedStatus === "saved" && (
                        <span className="flex items-center gap-1 text-[var(--color-success)]">
                            <Check size={11}/> Saved
                        </span>
                    )}
                </div>
            </div>

            {/* ── Editor ───────────────────────────────────────────── */}
            <div className="relative" onClick={() => setShowEmoji(false)}>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    onInput={resize}
                    placeholder="What would you like to share today?"
                    rows={8}
                    className="w-full resize-none bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none leading-relaxed"
                    style={{ minHeight: 200, maxHeight: 600 }}
                />
            </div>

            {/* ── Footer ───────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <AlignLeft size={11}/> {wordCount} words · ~{readingTime} min read
                </div>
                <div className={cn(
                    "text-[11px] font-medium tabular-nums",
                    twitterWarn ? "text-[var(--color-warning)]" : "text-muted-foreground",
                )}>
                    {charCount.toLocaleString()}
                    {twitterWarn && <span className="ml-1 text-[var(--color-warning)]">· near X limit (280)</span>}
                </div>
            </div>
        </div>
    )
}
