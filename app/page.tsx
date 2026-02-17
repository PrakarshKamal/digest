import { SignedIn, UserButton } from "@clerk/nextjs";
import { CTA } from "@/components/ui/shared/cta";
import { FAQ } from "@/components/ui/shared/faq";
import { Features } from "@/components/ui/shared/features";
import Hero from "@/components/ui/shared/hero";
import { HowItWorks } from "@/components/ui/shared/how-it-works";
import { Pricing } from "@/components/ui/shared/pricing";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
