import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { RippleButton } from "@/components/ui/ripple-button"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

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
        <div className="hidden layout-header md:p-8 lg:px-16 md:flex items-center justify-between  md:h-18.5 lg:h-21 h-16 w-screen">
          <div className="logo flex items-center gap-2.5 cursor-pointer">
            <Image src="/logo.png" alt="omnipost-logo" width={44} height={44}/>
            <span className="text-2xl font-bold">OmniPost</span>
          </div>
          <div className="flex items-center lg:gap-6 md:gap-4">
            <button className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
              Solution
            </button>
            <button className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
              Features
            </button>
            <button className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
              Pricing
            </button>
            <button className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
              About
            </button>
            <button className="text-sm cursor-pointer font-medium text-text-secondary hover:text-text-primary transition">
              Contact
            </button>
          </div>
          <div className="controll-buttons flex items-center gap-4">
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
          {children}
      </body>
    </html>
  );
}
