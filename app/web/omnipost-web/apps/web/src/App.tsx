import "./App.css";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { DashboardPreview } from "@/components/sections/dashboard-preview";

/**
 * App — root component for the OmniPost web app.
 *
 * Sections render in normal document flow (no absolute/fixed stacking).
 * Navbar is fixed; HeroSection and DashboardPreview stack vertically below it.
 *
 * Future sections slot in after DashboardPreview:
 *   <FeaturesSection />
 *   <SolutionsSection />
 *   <PricingSection />
 *   <CtaSection />
 *   <Footer />
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <DashboardPreview />
      </main>
    </div>
  );
}
