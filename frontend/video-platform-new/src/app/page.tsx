import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import UseCases from "@/components/landing/UseCases";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Metrics from "@/components/landing/Metrics";
import DeveloperSection from "@/components/landing/DeveloperSection";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <SocialProof /> */}
      <UseCases />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Metrics />
      {/* <DeveloperSection /> */}
      {/* <Testimonials /> */}
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
