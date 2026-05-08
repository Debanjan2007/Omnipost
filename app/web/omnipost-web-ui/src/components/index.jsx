import PostHero from "./HeroSection/PostHero.section.jsx";
import ConnectedAccounts from "./HeroSection/ConnectedAccounts.section.jsx";
import HistorySection from "./HeroSection/History.section.jsx";

function CreatePost() {
    return (
        <>
            <PostHero />
        </>
    )
}

function Accounts() {
    return (
        <>
            <ConnectedAccounts />
        </>
    )
}

function History() {
    return (
        <>
            <HistorySection />
        </>
    )
}

export {
    CreatePost ,
    Accounts ,
    History,
}