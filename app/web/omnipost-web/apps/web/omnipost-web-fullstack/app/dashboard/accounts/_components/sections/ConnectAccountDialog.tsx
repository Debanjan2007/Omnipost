"use client"

import { useState } from "react"
import { X, Search, Sparkles, Check } from "lucide-react"
import { SUPPORTED_PLATFORMS } from "../data/mockData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface ConnectAccountDialogProps {
    isOpen: boolean
    onClose: () => void
    onConnect: (platformName: string) => void
}

export function ConnectAccountDialog({ isOpen, onClose, onConnect }: ConnectAccountDialogProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [connecting, setConnecting] = useState<string | null>(null)

    if (!isOpen) return null

    const filteredPlatforms = SUPPORTED_PLATFORMS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleConnectClick = (platformName: string) => {
        setConnecting(platformName)
        setTimeout(() => {
            onConnect(platformName)
            setConnecting(null)
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <Sparkles size={16} className="text-primary" />
                            Connect New Account
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Select a social network to link your account</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Filter Search */}
                <div className="px-5 py-3 border-b border-border/60 bg-muted/10 flex items-center gap-2 shrink-0">
                    <Search size={14} className="text-muted-foreground shrink-0" />
                    <input
                        type="text"
                        placeholder="Search networks (e.g. Mastodon, TikTok...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                </div>

                {/* Platform Cards Grid */}
                <div className="flex-1 p-5 overflow-y-auto min-h-0 space-y-4">
                    {filteredPlatforms.length === 0 ? (
                        <div className="py-12 text-center space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">No matching platforms found</p>
                            <p className="text-[10px] text-muted-foreground/60">Try searching with a different keyword</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {filteredPlatforms.map((platform) => (
                                <div
                                    key={platform.name}
                                    className="group relative bg-muted/20 hover:bg-muted/40 border border-border/60 hover:border-primary/40 rounded-xl p-4 transition-all duration-250 flex flex-col justify-between"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3">
                                            <PlatformIcon name={platform.name} size={36} className="shadow-sm rounded-lg" />
                                            <div>
                                                <h4 className="text-xs font-bold text-foreground">{platform.name}</h4>
                                                <p className="text-[10px] text-muted-foreground font-medium">API OAuth2</p>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground/90 leading-normal">{platform.desc}</p>
                                        
                                        {/* Features List */}
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {platform.features.map(f => (
                                                <span key={f} className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-card border border-border/60 text-muted-foreground flex items-center gap-0.5">
                                                    <Check size={8} className="text-[var(--color-success)]" /> {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        type="button"
                                        disabled={connecting !== null}
                                        onClick={() => handleConnectClick(platform.name)}
                                        className={cn(
                                            "mt-4 w-full h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm",
                                            connecting === platform.name
                                                ? "bg-muted text-muted-foreground border border-border"
                                                : "bg-primary text-primary-foreground hover:bg-primary/95 hover:scale-[1.01] active:scale-95"
                                        )}
                                    >
                                        {connecting === platform.name ? (
                                            <>
                                                <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
                                                Authorizing...
                                            </>
                                        ) : (
                                            "Connect Network"
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Disclaimer */}
                <div className="px-5 py-3 border-t border-border/60 bg-muted/20 text-center shrink-0">
                    <p className="text-[10px] text-muted-foreground/70">
                        OmniPost uses secure official OAuth protocols. We will never share or sell your social media keys.
                    </p>
                </div>
            </div>
        </div>
    )
}
