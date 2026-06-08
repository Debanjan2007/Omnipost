import { Link } from "react-router-dom";

export default function ContactPage() {
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
                        <button className="text-text-primary hover:text-primary transition font-medium">About</button>
                    </Link>
                    <Link to="/contact">
                        <button className="text-primary font-semibold border-b-2 border-primary pb-0.5">Contact</button>
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
                <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Contact Us</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight max-w-2xl mx-auto">
                    Let's talk about<br className="hidden sm:block" /> your workflow.
                </h1>
                <p className="mt-5 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                    Have questions, feedback, or partnership ideas?
                    Reach out and we'll get back to you soon.
                </p>
            </div>

            {/* Contact Grid */}
            <div className="px-5 sm:px-8 lg:px-16 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Left — Info Panel */}
                    <div className="bg-primary text-white rounded-3xl p-10 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full"></div>
                        <div className="absolute -bottom-14 -left-10 w-64 h-64 bg-white/5 rounded-full"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                            <div className="space-y-7">

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 6h16v12H4z"/>
                                            <path d="M4 7l8 6 8-6"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Email</p>
                                        <p className="font-medium">support@omnipost.dev</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 21s-6-5.5-6-11a6 6 0 1112 0c0 5.5-6 11-6 11z"/>
                                            <circle cx="12" cy="10" r="2"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Location</p>
                                        <p className="font-medium">India</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className="bg-white/70 backdrop-blur-sm border border-white rounded-3xl p-8 sm:p-10 shadow-sm">
                        <h2 className="text-2xl font-bold text-text-heading mb-7">Send a Message</h2>

                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white/60 border border-white rounded-2xl px-5 py-3.5 outline-none focus:border-primary transition text-text-primary placeholder:text-text-secondary/60"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-white/60 border border-white rounded-2xl px-5 py-3.5 outline-none focus:border-primary transition text-text-primary placeholder:text-text-secondary/60"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us about your question..."
                                    className="w-full bg-white/60 border border-white rounded-2xl px-5 py-3.5 outline-none focus:border-primary transition resize-none text-text-primary placeholder:text-text-secondary/60"
                                ></textarea>
                            </div>

                            <button className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-2xl font-semibold transition shadow-md">
                                Send Message
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
