"use client"

import { Users } from "lucide-react"
import { useState } from "react"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

type AudienceType = "public" | "followers" | "private" | "custom"

const OPTIONS: { value: AudienceType; label: string; desc: string; icon: string }[] = [
    { value: "public",    label: "Public",    desc: "Anyone can see this post",           icon: "🌐" },
    { value: "followers", label: "Followers", desc: "Only your followers",                 icon: "👥" },
    { value: "private",   label: "Private",   desc: "Only you",                            icon: "🔒" },
    { value: "custom",    label: "Custom",    desc: "Select specific groups or segments",  icon: "✏️" },
]

export function AudiencePanel() {
    const [audience, setAudience] = useState<AudienceType>("public")

    return (
        <PanelCard title="Audience" icon={<Users size={14}/>} defaultOpen={false}>
            <div className="px-3 py-3 grid grid-cols-2 gap-2">
                {OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAudience(opt.value)}
                        className={cn(
                            "flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all",
                            audience === opt.value
                                ? "border-primary/60 bg-primary/8 ring-1 ring-primary/30"
                                : "border-border/60 hover:border-border hover:bg-muted/30",
                        )}
                        style={ audience === opt.value ? { background: "color-mix(in srgb, var(--primary) 8%, transparent)" } : undefined }
                    >
                        <span className="text-base leading-none">{opt.icon}</span>
                        <span className={cn("text-xs font-semibold", audience === opt.value ? "text-primary" : "text-foreground")}>
                            {opt.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</span>
                    </button>
                ))}
            </div>
        </PanelCard>
    )
}
