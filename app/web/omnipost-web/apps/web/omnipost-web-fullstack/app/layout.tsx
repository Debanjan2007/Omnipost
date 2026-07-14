import type {Metadata} from "next";
import {Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import {Providers} from "@/app/context/Providers"
import { Toaster } from "sonner"

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
            // suppressHydrationWarning prevents the React warning when the
            // ThemeProvider adds/removes the "dark" class on mount (client-only).
            suppressHydrationWarning
            className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
        >
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        try {
                            const cached = localStorage.getItem("appearance-settings");
                            if (cached) {
                                const settings = JSON.parse(cached);
                                const accent = settings.accentColor || "indigo";
                                const density = settings.density || "comfortable";
                                const animations = settings.animations !== false ? "enabled" : "disabled";
                                
                                document.documentElement.setAttribute("data-accent", accent);
                                document.documentElement.setAttribute("data-density", density);
                                document.documentElement.setAttribute("data-animations", animations);
                                
                                const theme = settings.theme || "system";
                                if (theme === "dark") {
                                    document.documentElement.classList.add("dark");
                                } else if (theme === "light") {
                                    document.documentElement.classList.remove("dark");
                                } else if (theme === "system") {
                                    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                                    document.documentElement.classList.toggle("dark", systemPrefersDark);
                                }
                            }
                        } catch (e) {}
                    `
                }}
            />
        </head>
        <body className="font-sans min-h-full flex flex-col">
        <ClerkProvider>
            {/* ThemeProvider + ProfileProvider — both client contexts */}
            <Providers>
                {children}
                {/* Global toast notifications — position bottom-right */}
                <Toaster
                    position="bottom-right"
                    richColors
                    closeButton
                    toastOptions={{ duration: 4000 }}
                />
            </Providers>
        </ClerkProvider>
        </body>
        </html>
    );
}
