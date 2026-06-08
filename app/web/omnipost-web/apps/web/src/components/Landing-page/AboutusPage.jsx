import { Link } from "react-router-dom";

export default function AboutPage() {
    return (
        <section className="min-h-screen bg-linear-to-b from-[#EFE8FF] via-[#F6F1FF] to-[#F7F5F2] overflow-hidden">

            {/* Navbar */}
            <nav className="w-full flex items-center justify-between px-5 sm:px-8 lg:px-16 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center">
                        <img src="/logo.png" alt="OmniPost Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-text-heading">OmniPost</h1>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/solution">
                        <button className="text-text-primary hover:text-primary transition font-medium">Solutions</button>
                    </Link>
                    <Link to="/features">
                        <button className="text-text-primary hover:text-primary transition font-medium">Features</button>
                    </Link>
                    <Link to="/pricing">
                        <button className="text-text-primary hover:text-primary transition font-medium">Pricing</button>
                    </Link>
                    <Link to="/about">
                        <button className="text-primary font-semibold border-b-2 border-primary pb-0.5">About</button>
                    </Link>
                    <Link to="/contact">
                        <button className="text-text-primary hover:text-primary transition font-medium">Contact</button>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <button className="hidden md:flex border border-neutral-400 hover:border-primary text-text-primary hover:text-primary transition px-5 py-2.5 rounded-2xl text-sm font-medium">
                            Log In
                        </button>
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-primary hover:bg-primary-dark text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition shadow-md whitespace-nowrap"
                    >
                        Start Free Trial
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="text-center px-5 pt-14 pb-4">
                <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">About OmniPost</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight max-w-2xl mx-auto">
                    A modern workspace for<br className="hidden sm:block" /> social media publishing.
                </h1>
                <p className="mt-5 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                    OmniPost helps creators, startups, and brands manage every social platform
                    from one clean and elegant dashboard.
                </p>
            </div>

            {/* Mission Cards */}
            <div className="px-5 sm:px-8 lg:px-16 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-xl rounded-3xl p-8 transition group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-primary" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-text-heading mb-4">Our Mission</h3>
                        <p className="text-text-secondary leading-relaxed text-base">
                            Simplify social media workflows with one powerful and unified platform.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-xl rounded-3xl p-8 transition group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-primary" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12h18"/>
                                <path d="M12 3v18"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-text-heading mb-4">Why OmniPost</h3>
                        <p className="text-text-secondary leading-relaxed text-base">
                            No clutter. No unnecessary complexity. Just clean publishing and analytics.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-xl rounded-3xl p-8 transition group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-primary" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20V10"/>
                                <path d="M18 20V4"/>
                                <path d="M6 20v-6"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-text-heading mb-4">The Vision</h3>
                        <p className="text-text-secondary leading-relaxed text-base">
                            Build the operating system for modern creators and digital brands.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA Banner */}
            <div className="px-5 sm:px-8 lg:px-16 pb-20 max-w-4xl mx-auto">
                <div className="bg-primary rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-14 -left-10 w-64 h-64 bg-white/5 rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Start managing social smarter.
                        </h2>
                        <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
                            Join OmniPost and manage every platform from one dashboard.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-block bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-2xl font-semibold text-base transition shadow-lg"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
