"use client"

import { History, Plus } from "lucide-react"

interface EmptyStateProps {
    onCreatePostClick: () => void
}

export function EmptyState({ onCreatePostClick }: EmptyStateProps) {
    return (
        <div className="bg-card border border-border/60 rounded-2xl p-12 text-center shadow-sm max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 my-8 animate-in fade-in duration-300">
            {/* Design elements */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                <History size={24} className="text-primary" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-ping" />
            </div>

            {/* Content text */}
            <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-foreground">No publishing history yet</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    Once you start composing, scheduling, or scheduling feed pipelines, all connection syncs and published activities will be tracked here.
                </p>
            </div>

            {/* CTA */}
            <button
                type="button"
                onClick={onCreatePostClick}
                className="h-8.5 px-4.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
                <Plus size={13} />
                Create Your First Post
            </button>
        </div>
    )
}
