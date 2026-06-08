import { Link } from "react-router-dom";

const features = [
    {
        label: "Multi-platform publishing",
        icon: <path d="M3 12h18M3 6h18M3 18h18" />,
    },
    {
        label: "Smart scheduling",
        icon: <path d="M8 6v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
    {
        label: "Analytics dashboard",
        icon: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    },
    {
        label: "Team collaboration",
        icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
    },
    {
        label: "Draft management",
        icon: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    },
    {
        label: "Cross-platform insights",
        icon: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    },
];

export default function FeaturesSection() {
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
                        <button className="text-primary font-semibold border-b-2 border-primary pb-0.5">Features</button>
                    </Link>
                    <Link to="/pricing">
                        <button className="text-text-primary hover:text-primary transition font-medium">Pricing</button>
                    </Link>
                    <Link to="/about">
                        <button className="text-text-primary hover:text-primary transition font-medium">About</button>
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
                <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Features</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight max-w-2xl mx-auto">
                    Everything you need to<br className="hidden sm:block" /> scale your content.
                </h1>
                <p className="mt-5 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                    OmniPost combines scheduling, analytics, and collaboration into one elegant workflow.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="px-5 sm:px-8 lg:px-16 py-14 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(({ label, icon }, index) => (
                        <div
                            key={index}
                            className="bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-lg rounded-2xl p-6 transition group"
                        >
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 stroke-primary"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {icon}
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-text-heading leading-snug">{label}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Banner */}
            <div className="px-5 sm:px-8 lg:px-16 pb-20 max-w-4xl mx-auto">
                <div className="bg-primary rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-14 -left-10 w-64 h-64 bg-white/5 rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            See all features in action.
                        </h2>
                        <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
                            Start your free trial and explore everything OmniPost has to offer.
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
