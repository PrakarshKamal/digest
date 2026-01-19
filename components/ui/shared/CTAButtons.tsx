import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTAButtons = async () => {
  const { has, userId } = await auth();
  const pro = await has({ plan: "pro" });
  const free = await has({ plan: "free" });
  const isOnPaidPlan = pro || free;
  return (
    <>
      <SignedOut>
        <SignInButton forceRedirectUrl="#/pricing">
          <Button size="lg" variant="outline">
            Sign In <ArrowRight />
          </Button>
        </SignInButton>
        <Button
          size="lg"
          variant="secondary"
          className="w-full sm:w-auto"
          asChild
        ></Button>
      </SignedOut>

      <SignedIn>
        {userId && isOnPaidPlan && (
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link
              href="/dashboard"
              className="flex items-center justify-center"
            >
              Go to Dashboard <ArrowRight />
            </Link>
          </Button>
        )}

        {userId && !isOnPaidPlan && (
          <>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link
                href="/#pricing"
                className="flex items-center justify-center"
              >
                Select a Plan <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </>
        )}
      </SignedIn>
    </>
  );
};
