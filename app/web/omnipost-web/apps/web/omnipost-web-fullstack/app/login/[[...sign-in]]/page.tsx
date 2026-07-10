import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex">
            {/* Left Panel — Branding */}
            <div
                className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #5D3FD3 0%, #8467D7 50%, #9C82F0 100%)',
                }}
            >
                {/* Background decorative circles */}
                <div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
                    style={{ background: 'rgba(255,255,255,0.3)' }}
                />
                <div
                    className="absolute bottom-10 -left-10 w-64 h-64 rounded-full opacity-10"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                />
                <div
                    className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full opacity-10"
                    style={{ background: 'rgba(255,255,255,0.4)' }}
                />

                {/* Logo */}
                <div className="flex items-center gap-3 z-10">
                    <Image src="/logo.png" alt="OmniPost Logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-white">OmniPost</span>
                </div>

                {/* Center copy */}
                <div className="z-10 space-y-6">
                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Welcome<br />back.
                    </h1>
                    <p className="text-lg text-white/80 max-w-sm leading-relaxed">
                        One platform for all your social media. Schedule, publish, and analyse — everything in one place.
                    </p>

                    {/* Feature badges */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {['Instagram', 'LinkedIn', 'X', 'Facebook'].map((platform) => (
                            <span
                                key={platform}
                                className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
                                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
                            >
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer quote */}
                <p className="z-10 text-white/50 text-sm">
                    "The easiest way to manage your social presence."
                </p>
            </div>

            {/* Right Panel — Clerk SignIn */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-background">
                {/* Mobile logo */}
                <div className="flex items-center gap-2 mb-8 lg:hidden">
                    <Image src="/logo.png" alt="OmniPost Logo" width={36} height={36} />
                    <span className="text-xl font-bold">OmniPost</span>
                </div>

                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'w-full max-w-md',
                            card: 'shadow-none border border-border bg-card rounded-2xl p-8',
                            headerTitle: 'text-2xl font-bold text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            formButtonPrimary:
                                'bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200',
                            formFieldInput:
                                'bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring transition-all duration-200',
                            footerActionLink: 'text-primary hover:text-primary/80 font-medium',
                            identityPreviewEditButton: 'text-primary',
                            dividerLine: 'bg-border',
                            dividerText: 'text-muted-foreground',
                            socialButtonsBlockButton:
                                'border border-border rounded-lg hover:bg-muted transition-all duration-200',
                            socialButtonsBlockButtonText: 'text-foreground font-medium',
                        },
                    }}
                />

                <p className="mt-6 text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    )
}
