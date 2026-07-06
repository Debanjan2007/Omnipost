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
import Image from "next/image";
import Link from "next/link";
import {RippleButton} from "@/components/ui/ripple-button"
import {InteractiveHoverButton} from "@/components/ui/interactive-hover-button"
import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler"


export function MobileNav() {
    return <>
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
    </>
}