import { Sparkles, Zap, ShieldCheck, CalendarX2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButtons } from "./CTAButtons";

export const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-20 sm:py-32">
      {/* Background Decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#6366f11f_2px,transparent_2px)] bg-size-[42px_42px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-3xl -translate-x-1/2 rounded-full bg-linear-to-r from-sky-400/20 via-violet-400/20 to-purple-400/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <Sparkles className="mr-2 size-4" />
            Ready to publish your next newsletter?
          </Badge>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Turn feeds into a polished edition—automatically.
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl">
            Creators use Digest to curate smarter and publish faster. Plans
            start at $9/month.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButtons />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:gap-6">
            <div className="inline-flex items-center gap-2">
              <Zap className="size-4 text-violet-600 dark:text-violet-400" />
              Generate in minutes
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-800" />
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              Your sources stay yours
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-800" />
            <div className="inline-flex items-center gap-2">
              <CalendarX2 className="size-4 text-blue-600 dark:text-blue-400" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
