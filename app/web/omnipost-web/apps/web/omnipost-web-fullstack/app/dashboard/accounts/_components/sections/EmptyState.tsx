"use client"

import { Wifi, Plus } from "lucide-react"

interface EmptyStateProps {
    onConnectClick: () => void
}

export function EmptyState({ onConnectClick }: EmptyStateProps) {
    return (
        <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 my-8 animate-in fade-in duration-300">
            {/* Design elements */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                <Wifi size={24} className="text-primary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-(--color-success) rounded-full border-2 border-card animate-pulse" />
            </div>

            {/* Content text */}
            <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-foreground">Connect your first social account</h3>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                    Publish updates, automate marketing streams, track analytics, and manage comments across multiple platforms from one cohesive dashboard.
                </p>
            </div>

            {/* CTA */}
            <button
                type="button"
                onClick={onConnectClick}
                className="h-8.5 px-4.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
                <Plus size={13} />
                Connect Social Account
            </button>
        </div>
    )
}
