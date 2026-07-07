"use client";

import Image from "next/image";
import Link from "next/link";

const productLinks = [
    { label: "Features", href: "#features" },
    { label: "Platforms", href: "#platforms" },
    { label: "FAQ", href: "#faq" },
];

const companyLinks = [
    { label: "About", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
];

export function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background">
            <div className="container py-14 px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link href="/" className="flex items-center gap-3 w-fit">
                            <Image
                                src="/logo.png"
                                alt="OmniPost"
                                width={42}
                                height={42}
                                className="rounded-lg"
                            />

                            <div>
                                <h3 className="text-lg font-semibold">OmniPost</h3>
                                <p className="text-sm text-muted-foreground">
                                    Publish Everywhere.
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-md text-sm leading-7 text-muted-foreground">
                            Manage all your social platforms from one dashboard. Schedule,
                            publish, and stay consistent without switching between apps.
                        </p>

                        {/*<div className="flex items-center gap-3">*/}
                        {/*    <Link*/}
                        {/*        href="#"*/}
                        {/*        className="rounded-lg border p-2 transition-colors hover:bg-muted"*/}
                        {/*    >*/}
                        {/*        <Twitter className="size-5" />*/}
                        {/*    </Link>*/}

                        {/*    <Link*/}
                        {/*        href="#"*/}
                        {/*        className="rounded-lg border p-2 transition-colors hover:bg-muted"*/}
                        {/*    >*/}
                        {/*        <Instagram className="size-5" />*/}
                        {/*    </Link>*/}

                        {/*    <Link*/}
                        {/*        href="#"*/}
                        {/*        className="rounded-lg border p-2 transition-colors hover:bg-muted"*/}
                        {/*    >*/}
                        {/*        <Linkedin className="size-5" />*/}
                        {/*    </Link>*/}

                        {/*    <Link*/}
                        {/*        href="#"*/}
                        {/*        className="rounded-lg border p-2 transition-colors hover:bg-muted"*/}
                        {/*    >*/}
                        {/*        <Github className="size-5" />*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="mb-5 font-semibold">Product</h4>

                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-5 font-semibold">Company</h4>

                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="my-10 h-px bg-border" />

                <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} OmniPost. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        <span>Built with</span>
                        <span className="text-red-500">♥</span>
                        <span>by Debanjan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}