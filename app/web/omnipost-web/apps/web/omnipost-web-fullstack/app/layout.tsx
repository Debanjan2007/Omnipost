import type {Metadata} from "next";
import {Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";

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
        {children}
        </body>
        </html>
    );
}
