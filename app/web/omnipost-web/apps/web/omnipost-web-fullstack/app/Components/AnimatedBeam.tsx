"use client";

import React, {useRef} from "react";
import Image from "next/image";
import {User} from "lucide-react";

import {AnimatedBeam} from "@/components/ui/animated-beam";
import {LogosSvg} from "@/components/ui/logos-svg";

export function AnimatedBeamContainer() {
    const userRef = useRef<HTMLDivElement>(null);
    const omniRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null)
    const twitterRef = useRef<HTMLDivElement>(null);
    const facebookRef = useRef<HTMLDivElement>(null);
    const instagramRef = useRef<HTMLDivElement>(null);
    const linkedinRef = useRef<HTMLDivElement>(null);

    return (
        <section className="grid items-center gap-16 lg:grid-cols-2">
            <div
                ref={containerRef}
                className="animated-beam relative flex justify-center">

                <div
                    className="flex items-center gap-16 lg:gap-24">

                    {/* User */}
                    <div
                        ref={userRef}
                        className="flex h-16 w-16 items-center justify-center rounded-full border shadow"
                    >
                        <User className="h-8 w-8"/>
                    </div>

                    {/* Omnipost */}
                    <div
                        ref={omniRef}
                        className="flex h-20 w-20 items-center justify-center rounded-full border shadow bg-background"
                    >
                        <Image
                            src="/logo.png"
                            alt="Omnipost"
                            width={42}
                            height={42}
                        />
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-5">

                        <SocialIcon ref={twitterRef}>
                            {LogosSvg.Twitter}
                        </SocialIcon>

                        <SocialIcon ref={facebookRef}>
                            {LogosSvg.Facebook}
                        </SocialIcon>

                        <SocialIcon ref={instagramRef}>
                            {LogosSvg.Instagram}
                        </SocialIcon>

                        <SocialIcon ref={linkedinRef}>
                            {LogosSvg.LinkedIn}
                        </SocialIcon>

                    </div>
                </div>

                {/* User -> Omnipost */}
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={userRef}
                    toRef={omniRef}
                    repeat={Infinity}
                />

                {/* Omnipost -> Platforms */}
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={omniRef}
                    toRef={twitterRef}
                    repeat={Infinity}
                />

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={omniRef}
                    toRef={facebookRef}
                    repeat={Infinity}
                />

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={omniRef}
                    toRef={instagramRef}
                    repeat={Infinity}
                />

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={omniRef}
                    toRef={linkedinRef}
                    repeat={Infinity}
                />
            </div>
            {/* Left Side */}
            <div className="px-4 md:px-0 space-y-8">
                <div className="space-y-6">
                    <p className="text-primary font-semibold uppercase tracking-widest">
                        Publish Everywhere
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        One post.
                        <br/>
                        Every platform.
                    </h2>

                    <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                        Write your content once. Omnipost automatically distributes it to all
                        your connected social platforms so you never waste time posting
                        manually again.
                    </p>
                </div>
            </div>

            {/* Right Side */}

        </section>
    );
}

type SocialIconProps = {
    children: React.ReactNode;
};

const SocialIcon = React.forwardRef<HTMLDivElement, SocialIconProps>(
    ({children}, ref) => (
        <div
            ref={ref}
            className="flex h-14 w-14 items-center justify-center rounded-full border shadow"
        >
            <div className="h-7 w-7 [&>svg]:h-full [&>svg]:w-full">
                {children}
            </div>
        </div>
    )
);

SocialIcon.displayName = "SocialIcon";