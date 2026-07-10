import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <div className="min-h-screen w-full flex bg-background">

            {/* ── Left Panel — Branding ─────────────────────────────────────────── */}
            <div className="
                hidden lg:flex lg:w-1/2 flex-col justify-between p-12
                relative overflow-hidden
                bg-[linear-gradient(135deg,var(--color-primary-dark)_0%,var(--primary)_50%,var(--color-primary-light)_100%)]
                dark:bg-[linear-gradient(135deg,#2d1f6e_0%,#4a30a0_50%,#6b4fc8_100%)]
            ">
                {/* Decorative blobs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10" />
                <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/5" />

                {/* Logo */}
                <div className="flex items-center gap-3 z-10">
                    <Image src="/logo.png" alt="OmniPost Logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-white">OmniPost</span>
                </div>

                {/* Hero copy */}
                <div className="z-10 space-y-6">
                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Start posting<br />smarter.
                    </h1>
                    <p className="text-lg text-white/80 max-w-sm leading-relaxed">
                        Join thousands of creators who use OmniPost to manage their social media presence — all in one dashboard.
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        {[
                            { value: '10k+', label: 'Active Users' },
                            { value: '4', label: 'Platforms' },
                            { value: '99.9%', label: 'Uptime' },
                            { value: 'Free', label: 'To start' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-xl p-4 bg-white/10 border border-white/20 backdrop-blur-sm"
                            >
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-white/70 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer quote */}
                <p className="z-10 text-white/50 text-sm">
                    &quot;Your social media, supercharged.&quot;
                </p>
            </div>

            {/* ── Right Panel — Clerk SignUp ─────────────────────────────────────── */}
            <div className="
                w-full lg:w-1/2 flex flex-col items-center justify-center
                px-6 py-12 bg-background
            ">
                {/* Mobile logo */}
                <div className="flex items-center gap-2 mb-8 lg:hidden">
                    <Image src="/logo.png" alt="OmniPost Logo" width={36} height={36} />
                    <span className="text-xl font-bold text-foreground">OmniPost</span>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'w-full max-w-md',
                            card: 'shadow-none border border-border bg-card rounded-2xl p-8',
                            headerTitle: 'text-2xl font-bold text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            formButtonPrimary:
                                'bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200',
                            formFieldInput:
                                'bg-background border border-input text-foreground rounded-lg focus:ring-2 focus:ring-ring transition-all duration-200',
                            formFieldLabel: 'text-foreground font-medium',
                            footerActionLink: 'text-primary hover:text-primary/80 font-medium',
                            footerActionText: 'text-muted-foreground',
                            identityPreviewEditButton: 'text-primary',
                            dividerLine: 'bg-border',
                            dividerText: 'text-muted-foreground',
                            socialButtonsBlockButton:
                                'border border-border bg-card hover:bg-muted text-foreground rounded-lg transition-all duration-200',
                            socialButtonsBlockButtonText: 'text-foreground font-medium',
                            alertText: 'text-destructive',
                        },
                    }}
                />

                <p className="mt-6 text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}