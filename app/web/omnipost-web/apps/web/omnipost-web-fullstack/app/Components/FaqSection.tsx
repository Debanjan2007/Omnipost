"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Which social platforms does OmniPost support?",
        answer:
            "OmniPost lets you publish content across multiple social media platforms from one dashboard. Support will continue expanding as new integrations are added.",
    },
    {
        question: "Can I schedule posts in advance?",
        answer:
            "Yes. Create your content once, choose the date and time, and OmniPost will automatically publish it when scheduled.",
    },
    {
        question: "Do I need separate accounts for each platform?",
        answer:
            "Yes. You'll connect your existing social media accounts securely. OmniPost never creates accounts on your behalf.",
    },
    {
        question: "Is my account data secure?",
        answer:
            "Absolutely. Authentication is handled securely using industry-standard OAuth wherever supported. Your credentials are never stored in plain text.",
    },
    {
        question: "Can I customize posts for each platform?",
        answer:
            "Yes. While you can publish one post everywhere, you'll also be able to tailor captions, hashtags, and media for individual platforms.",
    },
    {
        question: "Will analytics be available?",
        answer:
            "Analytics are part of our roadmap. You'll be able to monitor engagement, reach, and performance across platforms from a single dashboard.",
    },
    {
        question: "Is OmniPost free?",
        answer:
            "A free plan will be available with core features. Premium plans will unlock advanced scheduling, analytics, team collaboration, and additional integrations.",
    },
    {
        question: "Who is OmniPost built for?",
        answer:
            "Creators, freelancers, startups, agencies, businesses, and anyone tired of manually posting the same content to multiple platforms.",
    },
];

export function FAQSection() {
    return (
        <section className="container py-24">
            <div className="mx-auto max-w-3xl">
                <div className="mb-12 text-center">
          <span className="text-primary font-medium">
            Frequently Asked Questions
          </span>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Everything you need to know
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Still have questions? We&apos;re constantly improving OmniPost and adding
                        new platform integrations.
                    </p>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-xl border bg-card px-6"
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                        >
                            <AccordionTrigger className="text-left text-base font-semibold">
                                {faq.question}
                            </AccordionTrigger>

                            <AccordionContent className="text-muted-foreground leading-7">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}