import type {Metadata} from "next";
import {Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import {RippleButton} from "@/components/ui/ripple-button"
import {InteractiveHoverButton} from "@/components/ui/interactive-hover-button"
import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Menu} from "lucide-react"

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "OmniPost",
    description: "One platform for all your social media needs.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="font-sans min-h-full flex flex-col">
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
            className="layout-header-mobile h-16 w-screen flex items-center justify-between justify-between px-4 md:hidden lg:hidden">
            <Sheet>
                <SheetTrigger><Menu/></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <div className="logo flex items-center gap-2.5 cursor-pointer">
                                <Image src="/logo.png" alt="omnipost-logo" width={32} height={32}/>
                                <span className="text-2xl font-bold">OmniPost</span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="w-full flex flex-col gap-4 pr-2">
                        <ul className="w-full flex flex-col gap-4 p-4">
                            <li>
                                <button
                                    className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                                    Solution
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                                    Features
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                                    Pricing
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="controll-buttons flex items-center gap-4">
                <RippleButton>
                    <Link href="/login">Login</Link>
                </RippleButton>
                <InteractiveHoverButton>
                    <Link href="/signup">
                        Sign up
                    </Link>
                </InteractiveHoverButton>
                <AnimatedThemeToggler/>
            </div>
        </div>
        {children}
        </body>
        </html>
);
}
