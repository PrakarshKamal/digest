"use client";

import { useAuth } from "@clerk/nextjs";
import { Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Badge } from "@/components/ui/badge";

type PlanTier = "free" | "pro" | "max" | null;

export function PlanBadge() {
  const { has, isLoaded, userId } = useAuth();
  const [planTier, setPlanTier] = React.useState<PlanTier>(null);

  React.useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!userId || !has) {
      setPlanTier("free");
      return;
    }

    const nextPlanTier = has({ plan: "max" })
      ? "max"
      : has({ plan: "pro" })
        ? "pro"
        : "free";

    setPlanTier((currentTier) =>
      currentTier === nextPlanTier ? currentTier : nextPlanTier,
    );
  }, [has, isLoaded, userId]);

  if (!isLoaded || planTier === null) {
    return null;
  }

  if (planTier === "max") {
    return (
      <Link href="/#pricing">
        <Badge className="cursor-pointer gap-1.5 border-0 bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 px-3 py-1.5 text-white transition-all hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700">
          <Crown className="h-3.5 w-3.5" />
          <span className="font-semibold">Max</span>
        </Badge>
      </Link>
    );
  }

  if (planTier === "pro") {
    return (
      <Link href="/#pricing">
        <Badge className="cursor-pointer gap-1.5 border-0 bg-linear-to-r from-blue-600 to-purple-600 px-3 py-1.5 text-white transition-all hover:from-blue-700 hover:to-purple-700">
          <Crown className="h-3.5 w-3.5" />
          <span className="font-semibold">Pro</span>
        </Badge>
      </Link>
    );
  }

  return (
    <Link href="/#pricing">
      <Badge
        variant="secondary"
        className="cursor-pointer gap-1.5 px-3 py-1.5 transition-all hover:bg-secondary/80"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span className="font-semibold">Free</span>
      </Badge>
    </Link>
  );
}
