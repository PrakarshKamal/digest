import { SignedIn, UserButton } from "@clerk/nextjs";
import Hero from "@/components/ui/shared/hero";
import { HowItWorks } from "@/components/ui/shared/how-it-works";
import { Features } from "@/components/ui/shared/features";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <SignedIn>
        <div className="fixed top-5 right-5">
          <UserButton />
        </div>
      </SignedIn>
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      {/* <CTA /> */}
    </main>
  );
}
