import Hero from "@/components/ui/shared/hero";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen">
      Hello World
      <Hero />
      {/* <Features /> */}
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
