import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import KeyFeatures from "@/components/sections/KeyFeatures";


export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-items-center min-h-screen">
        <HeroSection />
        <KeyFeatures />
        <ContactSection />
    </div>
  );
}
