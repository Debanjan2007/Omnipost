import Image from "next/image";
import {MobileNav} from "./Components/Mobile-nav"
import Link from "next/link";
import {RippleButton} from "@/components/ui/ripple-button"
import {InteractiveHoverButton} from "@/components/ui/interactive-hover-button"
import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler"


export default function Home() {
    return (
        <div className="landing-page h-screen w-screen">
            <nav>
                <div
                    className="hidden layout-header md:p-8 lg:px-16 md:flex items-center justify-between  md:h-18.5 lg:h-21 w-screen">
                    <div className="logo flex items-center gap-2.5 cursor-pointer">
                        <Image src="/logo.png" alt="omnipost-logo" width={44} height={44}/>
                        <span className="text-2xl font-bold">OmniPost</span>
                    </div>
                    <div className="flex items-center lg:gap-6 md:gap-4">
                        <button
                            className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                            Solution
                        </button>
                        <button
                            className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                            Features
                        </button>
                        <button
                            className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                            Pricing
                        </button>
                        <button
                            className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                            About
                        </button>
                        <button
                            className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                            Contact
                        </button>
                    </div>
                    <div className="controll-buttons flex items-center gap-4">
                        <AnimatedThemeToggler/>
                        <RippleButton>
                            <Link href="/login">Login</Link>
                        </RippleButton>
                        <InteractiveHoverButton>
                            <Link href="/signup">
                                Sign up
                            </Link>
                        </InteractiveHoverButton>
                    </div>
                </div>
                <div
                    className="layout-header-mobile h-16 w-screen flex items-center justify-between px-4 md:hidden lg:hidden">
                    <MobileNav/>
                </div>
            </nav>
        </div>
    );
}
