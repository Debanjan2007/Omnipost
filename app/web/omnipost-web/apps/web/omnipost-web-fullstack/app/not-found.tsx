"use client"

import Link from "next/link";

export default function Notfound() {
    return <>
        <div className="container h-screen w-screen">
            <div
                className="min-h-screen bg-background flex items-center justify-between overflow-hidden px-10 lg:px-24 relative">

                {/* LEFT CONTENT */}
                <div className="max-w-xl z-10">

                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-border shadow-sm mb-6">
                        <div className="w-2 h-2 rounded-full bg-primary"/>
                        <span className="text-sm text-muted-foreground font-medium">
                        OmniPost System Notice
                    </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                        Something went
                        <br/>
                        wrong.
                    </h1>

                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
                        We couldn’t process your request right now.
                        The issue is temporary and our systems are already recovering.
                    </p>

                    <div className="flex items-center gap-4 mt-10">

                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary hover:bg-primary-dark transition-all duration-300 text-primary-foreground px-6 py-3 rounded-2xl font-medium shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            Retry
                        </button>

                        <Link
                            href="/dashboard"
                            className="px-6 py-3 rounded-2xl border border-border text-foreground hover:bg-accent transition-all duration-300 font-medium"
                        >
                            Go Back
                        </Link>

                    </div>
                </div>

                {/* RIGHT ILLUSTRATION */}
                <div className="hidden lg:flex relative w-150 h-150 items-center justify-center">

                    {/* BACK GLOW */}
                    <div className="absolute w-105 h-105 rounded-full bg-primary-light/20 blur-3xl"/>

                    {/* MAIN DASHBOARD CARD */}
                    <div
                        className="absolute w-[320px] h-55 rounded-4xl bg-card/70 backdrop-blur-xl border border-border shadow-2xl p-5 -rotate-6">

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-3 h-3 rounded-full bg-primary"/>
                            <div className="w-20 h-2 rounded-full bg-muted"/>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="h-24 rounded-2xl bg-background border border-border"/>
                            <div className="h-24 rounded-2xl bg-background border border-border"/>
                            <div className="h-24 rounded-2xl bg-background border border-border"/>
                            <div className="h-24 rounded-2xl bg-background border border-border"/>

                        </div>
                    </div>

                    {/* FLOATING CARD 1 */}
                    <div
                        className="absolute top-10 left-10 w-45 h-30 rounded-3xl bg-card/80 backdrop-blur-lg border border-border shadow-xl p-4 rotate-[-10deg]">

                        <div className="w-16 h-2 rounded-full bg-muted mb-4"/>

                        <div className="space-y-3">
                            <div className="h-2 rounded-full bg-muted"/>
                            <div className="h-2 rounded-full bg-muted w-4/5"/>
                            <div className="h-8 rounded-xl bg-primary"/>
                        </div>
                    </div>

                    {/* FLOATING CARD 2 */}
                    <div
                        className="absolute bottom-16 left-16 w-50 h-32.5 rounded-3xl bg-card/80 backdrop-blur-lg border border-border shadow-xl p-4 rotate-[8deg]">

                        <div className="w-20 h-2 rounded-full bg-muted mb-6"/>

                        <div className="flex items-end gap-2 h-14">
                            <div className="w-6 h-8 rounded-full bg-primary-light/60"/>
                            <div className="w-6 h-12 rounded-full bg-primary-light"/>
                            <div className="w-6 h-6 rounded-full bg-muted"/>
                            <div className="w-6 h-10 rounded-full bg-primary"/>
                        </div>
                    </div>

                    {/* FLOATING ERROR CARD */}
                    <div
                        className="absolute right-0 bottom-24 w-60 h-40 rounded-[28px] bg-card/85 backdrop-blur-xl border border-border shadow-2xl p-5 rotate-6">

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-3 h-3 rounded-full bg-warning"/>
                            <div className="w-24 h-2 rounded-full bg-muted"/>
                        </div>

                        <div className="space-y-3">
                            <div className="h-2 rounded-full bg-muted"/>
                            <div className="h-2 rounded-full bg-muted w-5/6"/>
                            <div className="h-10 rounded-2xl bg-primary/10 border border-primary/30"/>
                        </div>
                    </div>

                    {/* CONNECTION LINES */}
                    <div className="absolute inset-0">

                        <div className="absolute top-32 left-48 w-24 border border-dashed border-primary/40"/>

                        <div className="absolute bottom-40 right-40 h-24 border border-dashed border-primary/40"/>

                        <div className="absolute top-1/2 right-52 w-20 border border-dashed border-primary/40"/>

                    </div>

                    {/* FLOATING DOTS */}
                    <div className="absolute top-24 right-40 w-3 h-3 rounded-full bg-primary"/>
                    <div className="absolute bottom-32 right-20 w-2 h-2 rounded-full bg-data-teal"/>
                    <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-primary-light"/>
                    <div className="absolute bottom-10 left-1/2 w-3 h-3 rounded-full bg-primary-dark"/>

                </div>

            </div>
        </div>
    </>
}
