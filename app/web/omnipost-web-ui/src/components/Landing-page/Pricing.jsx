import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
    {
        name: "Starter",
        desc: "Perfect for individuals and creators just getting started.",
        monthly: 0,
        annual: 0,
        cta: "Get Started Free",
        ctaLink: "/signup",
        highlight: false,
        features: [
            "3 connected social accounts",
            "30 scheduled posts/month",
            "Basic analytics",
            "Single user",
            "Community support",
        ],
        missing: [
            "Advanced analytics",
            "Team collaboration",
            "AI caption assist",
            "Priority support",
        ],
    },
    {
        name: "Pro",
        desc: "Advanced tools for growing brands and content teams.",
        monthly: 999,
        annual: 799,
        cta: "Start 7-Day Free Trial",
        ctaLink: "/signup",
        highlight: true,
        badge: "Most Popular",
        features: [
            "10 connected social accounts",
            "Unlimited scheduled posts",
            "Advanced analytics & reports",
            "AI caption assist",
            "Up to 3 team members",
            "Priority email support",
        ],
        missing: [
            "Dedicated account manager",
            "Custom integrations",
        ],
    },
    {
        name: "Business",
        desc: "Full-scale solution for agencies and large teams.",
        monthly: 2499,
        annual: 1999,
        cta: "Contact Sales",
        ctaLink: "/signup",
        highlight: false,
        features: [
            "Unlimited social accounts",
            "Unlimited scheduled posts",
            "White-label reports",
            "AI caption & hashtag assist",
            "Unlimited team members",
            "Dedicated account manager",
            "Custom integrations & API",
            "24/7 priority support",
        ],
        missing: [],
    },
];

const faqs = [
    {
        q: "Can I switch plans anytime?",
        a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.",
    },
    {
        q: "Is there a free trial?",
        a: "The Pro plan comes with a 7-day free trial — no credit card required. Starter is free forever.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, and net banking via Razorpay.",
    },
    {
        q: "Are prices inclusive of GST?",
        a: "Displayed prices are exclusive of GST. 18% GST will be added at checkout as applicable.",
    },
    {
        q: "What happens if I exceed my post limit?",
        a: "On the Starter plan, additional posts are queued and you'll be prompted to upgrade. Pro and Business plans have no limits.",
    },
];

function CheckIcon({ faded }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 shrink-0 ${faded ? "stroke-neutral-300" : "stroke-primary"}`}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12l5 5L20 7" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0 stroke-neutral-300"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-text-heading font-medium hover:bg-neutral-50 transition"
            >
                <span>{q}</span>
                <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 stroke-neutral-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="px-6 pb-5 text-text-secondary leading-relaxed text-sm">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function PricingPage() {
    const [annual, setAnnual] = useState(false);

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
                        <button className="text-primary font-semibold border-b-2 border-primary pb-0.5">Pricing</button>
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
            <div className="text-center px-5 pt-14 pb-6">
                <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Pricing</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight max-w-2xl mx-auto">
                    Simple pricing,<br className="hidden sm:block" /> no surprises.
                </h1>
                <p className="mt-5 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                    Pick a plan that fits your workflow. Start free, scale when ready.
                </p>

                {/* Billing Toggle */}
                <div className="inline-flex items-center gap-4 mt-8 bg-white border border-neutral-200 rounded-2xl p-1.5 shadow-sm">
                    <button
                        onClick={() => setAnnual(false)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                            !annual ? "bg-primary text-white shadow" : "text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setAnnual(true)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                            annual ? "bg-primary text-white shadow" : "text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        Annual
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${annual ? "bg-white/20 text-white" : "bg-green-100 text-green-700"}`}>
                            Save 20%
                        </span>
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="px-5 sm:px-8 lg:px-16 py-10 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 flex flex-col ${
                                plan.highlight
                                    ? "bg-primary text-white shadow-2xl scale-[1.03]"
                                    : "bg-white border border-neutral-200 shadow-sm"
                            }`}
                        >
                            {plan.badge && (
                                <div className="absolute top-5 right-5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                    {plan.badge}
                                </div>
                            )}

                            <h3 className={`text-2xl font-semibold mb-2 ${plan.highlight ? "text-white" : "text-text-heading"}`}>
                                {plan.name}
                            </h3>
                            <p className={`text-sm leading-relaxed mb-8 ${plan.highlight ? "text-white/75" : "text-text-secondary"}`}>
                                {plan.desc}
                            </p>

                            <div className="flex items-end gap-1.5 mb-8">
                                {plan.monthly === 0 ? (
                                    <span className={`text-5xl font-bold ${plan.highlight ? "text-white" : "text-text-heading"}`}>
                                        Free
                                    </span>
                                ) : (
                                    <>
                                        <span className={`text-2xl font-semibold self-start mt-2 ${plan.highlight ? "text-white/80" : "text-text-secondary"}`}>
                                            ₹
                                        </span>
                                        <span className={`text-5xl font-bold leading-none ${plan.highlight ? "text-white" : "text-text-heading"}`}>
                                            {annual ? plan.annual.toLocaleString("en-IN") : plan.monthly.toLocaleString("en-IN")}
                                        </span>
                                        <span className={`mb-1 text-sm ${plan.highlight ? "text-white/70" : "text-text-secondary"}`}>
                                            /month
                                        </span>
                                    </>
                                )}
                            </div>

                            {annual && plan.monthly > 0 && (
                                <p className={`-mt-5 mb-7 text-xs ${plan.highlight ? "text-white/60" : "text-text-secondary"}`}>
                                    Billed as ₹{(plan.annual * 12).toLocaleString("en-IN")}/year
                                </p>
                            )}

                            <div className="space-y-3.5 mb-10 flex-1">
                                {plan.features.map((f) => (
                                    <div key={f} className="flex items-center gap-3">
                                        {plan.highlight ? (
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 stroke-white" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12l5 5L20 7" />
                                            </svg>
                                        ) : (
                                            <CheckIcon />
                                        )}
                                        <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-text-primary"}`}>{f}</span>
                                    </div>
                                ))}
                                {plan.missing.map((f) => (
                                    <div key={f} className="flex items-center gap-3">
                                        <XIcon />
                                        <span className="text-sm text-neutral-400">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={plan.ctaLink}
                                className={`block text-center py-3.5 rounded-2xl font-medium text-sm transition ${
                                    plan.highlight
                                        ? "bg-white text-primary hover:bg-neutral-100"
                                        : "bg-primary hover:bg-primary-dark text-white"
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="px-5 sm:px-8 lg:px-16 py-10 max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-heading text-center mb-10">
                    Compare plans in detail
                </h2>
                <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="grid grid-cols-4 border-b border-neutral-100">
                        <div className="p-5 text-sm font-semibold text-text-secondary">Feature</div>
                        {plans.map((p) => (
                            <div
                                key={p.name}
                                className={`p-5 text-center text-sm font-semibold ${
                                    p.highlight ? "bg-primary/5 text-primary" : "text-text-heading"
                                }`}
                            >
                                {p.name}
                            </div>
                        ))}
                    </div>

                    {[
                        { label: "Social accounts", vals: ["3", "10", "Unlimited"] },
                        { label: "Scheduled posts/month", vals: ["30", "Unlimited", "Unlimited"] },
                        { label: "Team members", vals: ["1", "3", "Unlimited"] },
                        { label: "Analytics", vals: ["Basic", "Advanced", "White-label"] },
                        { label: "AI caption assist", vals: [false, true, true] },
                        { label: "Custom integrations", vals: [false, false, true] },
                        { label: "Priority support", vals: [false, true, true] },
                        { label: "Dedicated account manager", vals: [false, false, true] },
                    ].map((row, i) => (
                        <div
                            key={row.label}
                            className={`grid grid-cols-4 border-b border-neutral-100 last:border-0 ${i % 2 === 0 ? "" : "bg-neutral-50/50"}`}
                        >
                            <div className="p-4 sm:p-5 text-sm text-text-primary">{row.label}</div>
                            {row.vals.map((v, j) => (
                                <div key={j} className={`p-4 sm:p-5 flex items-center justify-center ${plans[j].highlight ? "bg-primary/5" : ""}`}>
                                    {typeof v === "boolean" ? (
                                        v ? (
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-primary" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12l5 5L20 7" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-neutral-300" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        )
                                    ) : (
                                        <span className={`text-sm font-medium ${plans[j].highlight ? "text-primary" : "text-text-heading"}`}>{v}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="px-5 sm:px-8 lg:px-16 py-10 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-heading text-center mb-8">
                    Frequently asked questions
                </h2>
                <div className="space-y-3">
                    {faqs.map((f) => (
                        <FaqItem key={f.q} q={f.q} a={f.a} />
                    ))}
                </div>
            </div>

            {/* CTA Banner */}
            <div className="px-5 sm:px-8 lg:px-16 py-10 pb-20 max-w-4xl mx-auto">
                <div className="bg-primary rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-14 -left-10 w-64 h-64 bg-white/5 rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Ready to unify your social presence?
                        </h2>
                        <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
                            Join thousands of creators and brands scheduling smarter with OmniPost.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-block bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-2xl font-semibold text-base transition shadow-lg"
                        >
                            Get Started Free — No credit card needed
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
