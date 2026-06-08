import { Link } from "react-router-dom";

const solutions = [
    {
        title: "For Creators",
        description:
            "Manage every platform from one clean workspace without switching tabs all day.",
        icon: <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
    },
    {
        title: "For Startups",
        description:
            "Launch campaigns faster and keep your social presence active with scheduled publishing.",
        icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
    },
    {
        title: "For Agencies",
        description:
            "Handle multiple client accounts, analytics, and content pipelines in one dashboard.",
        icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
    },
];

const highlights = [
    { value: "50K+", label: "Active users" },
    { value: "12+", label: "Platforms supported" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "4.9★", label: "Average rating" },
];

export default function SolutionsSection() {
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
                        <button className="text-primary font-semibold border-b-2 border-primary pb-0.5">Solutions</button>
                    </Link>
                    <Link to="/features">
                        <button className="text-text-primary hover:text-primary transition font-medium">Features</button>
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
                <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Solutions</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight max-w-2xl mx-auto">
                    Built for modern<br className="hidden sm:block" /> social workflows.
                </h1>
                <p className="mt-5 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                    Whether you are a solo creator or a growing team, OmniPost helps you publish smarter.
                </p>
            </div>

            {/* Stats strip */}
            <div className="px-5 sm:px-8 lg:px-16 pt-10 pb-2 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {highlights.map(({ value, label }) => (
                        <div key={label} className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-5 text-center shadow-sm">
                            <p className="text-2xl font-bold text-primary">{value}</p>
                            <p className="text-sm text-text-secondary mt-1">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Solution Cards */}
            <div className="px-5 sm:px-8 lg:px-16 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {solutions.map(({ title, description, icon }, index) => (
                        <div
                            key={index}
                            className="bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-xl rounded-3xl p-8 transition group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7 stroke-primary"
                                    fill="none"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {icon}
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-text-heading mb-4">{title}</h3>
                            <p className="text-text-secondary leading-relaxed text-base">{description}</p>
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
                            Find the plan that fits your team.
                        </h2>
                        <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
                            From solo creators to large agencies — OmniPost scales with you.
                        </p>
                        <Link
                            to="/pricing"
                            className="inline-block bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-2xl font-semibold text-base transition shadow-lg"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
