import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-between overflow-hidden px-10 lg:px-24 relative">

            {/* LEFT CONTENT */}
            <div className="max-w-xl z-10">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#E5E0F5] shadow-sm mb-6">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-text-primary font-medium">
                        OmniPost System Notice
                    </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-text-heading leading-tight">
                    Something went
                    <br />
                    wrong.
                </h1>

                <p className="mt-6 text-lg text-[#778899] leading-relaxed max-w-md">
                    We couldn’t process your request right now.
                    The issue is temporary and our systems are already recovering.
                </p>

                <div className="flex items-center gap-4 mt-10">

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-primary-dark transition-all duration-300 text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-purple-200 cursor-pointer"
                    >
                        Retry
                    </button>

                    <Link
                        to="/dashboard"
                        className="px-6 py-3 rounded-2xl border border-[#DDD6F7] text-text-primary hover:bg-white/70 transition-all duration-300 font-medium"
                    >
                        Go Back
                    </Link>

                </div>
            </div>

            {/* RIGHT ILLUSTRATION */}
            <div className="hidden lg:flex relative w-150 h-150 items-center justify-center">

                {/* BACK GLOW */}
                <div className="absolute w-105 h-105 rounded-full bg-primary-light/20 blur-3xl" />

                {/* MAIN DASHBOARD CARD */}
                <div className="absolute w-[320px] h-55 rounded-4xl bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-5 rotate-[-6deg]">

                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <div className="w-20 h-2 rounded-full bg-[#E7E2F8]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="h-24 rounded-2xl bg-background border border-[#EEE8FF]" />
                        <div className="h-24 rounded-2xl bg-background border border-[#EEE8FF]" />
                        <div className="h-24 rounded-2xl bg-background border border-[#EEE8FF]" />
                        <div className="h-24 rounded-2xl bg-background border border-[#EEE8FF]" />

                    </div>
                </div>

                {/* FLOATING CARD 1 */}
                <div className="absolute top-10 left-10 w-45 h-30 rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-xl p-4 rotate-[-10deg]">

                    <div className="w-16 h-2 rounded-full bg-[#E7E2F8] mb-4" />

                    <div className="space-y-3">
                        <div className="h-2 rounded-full bg-[#EEE8FF]" />
                        <div className="h-2 rounded-full bg-[#EEE8FF] w-4/5" />
                        <div className="h-8 rounded-xl bg-primary" />
                    </div>
                </div>

                {/* FLOATING CARD 2 */}
                <div className="absolute bottom-16 left-16 w-50 h-32.5 rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-xl p-4 rotate-[8deg]">

                    <div className="w-20 h-2 rounded-full bg-[#E7E2F8] mb-6" />

                    <div className="flex items-end gap-2 h-14">
                        <div className="w-6 h-8 rounded-full bg-[#D7CCFF]" />
                        <div className="w-6 h-12 rounded-full bg-[#B8A6FF]" />
                        <div className="w-6 h-6 rounded-full bg-[#EEE8FF]" />
                        <div className="w-6 h-10 rounded-full bg-primary" />
                    </div>
                </div>

                {/* FLOATING ERROR CARD */}
                <div className="absolute right-0 bottom-24 w-60 h-40 rounded-[28px] bg-white/85 backdrop-blur-xl border border-[#EEE8FF] shadow-2xl p-5 rotate-[6deg]">

                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-3 h-3 rounded-full bg-orange-400" />
                        <div className="w-24 h-2 rounded-full bg-[#EEE8FF]" />
                    </div>

                    <div className="space-y-3">
                        <div className="h-2 rounded-full bg-[#EEE8FF]" />
                        <div className="h-2 rounded-full bg-[#EEE8FF] w-5/6" />
                        <div className="h-10 rounded-2xl bg-primary/10 border border-[#DCCFFF]" />
                    </div>
                </div>

                {/* CONNECTION LINES */}
                <div className="absolute inset-0">

                    <div className="absolute top-32 left-48 w-24 border border-dashed border-[#B8A6FF]" />

                    <div className="absolute bottom-40 right-40 h-24 border border-dashed border-[#B8A6FF]" />

                    <div className="absolute top-1/2 right-52 w-20 border border-dashed border-[#B8A6FF]" />

                </div>

                {/* FLOATING DOTS */}
                <div className="absolute top-24 right-40 w-3 h-3 rounded-full bg-primary" />
                <div className="absolute bottom-32 right-20 w-2 h-2 rounded-full bg-[#0F766E]" />
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-primary-light" />
                <div className="absolute bottom-10 left-1/2 w-3 h-3 rounded-full bg-primary-dark" />

            </div>

        </div>
    );
}