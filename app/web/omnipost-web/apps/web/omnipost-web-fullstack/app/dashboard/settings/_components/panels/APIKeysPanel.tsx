"use client"

import { useState } from "react"
import { MOCK_API_KEYS } from "../data/settingsData"
import { KeyRound, Plus, Copy, RefreshCw, Trash2, Check } from "lucide-react"

export function APIKeysPanel() {
    const [keys, setKeys] = useState(MOCK_API_KEYS)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const handleCopy = (id: string, token: string) => {
        navigator.clipboard.writeText(token)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 1500)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this API Key? Any application utilizing this token will fail.")) {
            setKeys(keys.filter(k => k.id !== id))
        }
    }

    const handleGenerate = () => {
        const newKey = {
            id: `key-${Date.now()}`,
            name: "New Developer Token",
            token: `op_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
            created: "Today",
            status: "Active"
        }
        setKeys([newKey, ...keys])
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-bold text-foreground">Personal Access Tokens</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Generate API credentials for programmatic integrations.</p>
                </div>
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="h-7 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
                >
                    <Plus size={12} /> Generate Key
                </button>
            </div>
            <div className="h-px bg-border/40" />

            {/* Keys list */}
            <div className="space-y-3.5 text-xs">
                {keys.map((k) => (
                    <div key={k.id} className="p-3.5 rounded-xl border border-border/60 bg-muted/10 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">{k.name}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                {k.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <code className="text-[11px] font-mono bg-popover border border-border px-2 py-0.5 rounded text-muted-foreground">
                                {k.token}
                            </code>
                            <div className="flex gap-1.5 shrink-0">
                                <button
                                    onClick={() => handleCopy(k.id, k.token)}
                                    className="w-6.5 h-6.5 rounded-md border border-border bg-card hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                                    title="Copy key"
                                >
                                    {copiedId === k.id ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(k.id)}
                                    className="w-6.5 h-6.5 rounded-md border border-red-500/20 hover:border-red-500/40 text-red-500 hover:bg-red-500/5 flex items-center justify-center"
                                    title="Delete key"
                                >
                                    <Trash2 size={11} />
                                </button>
                            </div>
                        </div>
                        <p className="text-[9px] text-muted-foreground/60">Created on {k.created}</p>
                    </div>
                ))}
            </div>

            {/* Rate limit usage */}
            <div className="pt-2 space-y-2 text-xs">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Rate Limit Usage</p>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Staging API Limits</span>
                    <span className="font-semibold text-foreground">1,240 / 10,000 requests per day</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "12.4%" }} />
                </div>
            </div>
        </div>
    )
}
