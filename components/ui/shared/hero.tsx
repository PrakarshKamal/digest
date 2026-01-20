import { WandSparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButtons } from "./CTAButtons";
import { HeroVisuals } from "./hero-visuals";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 py-20 sm:py-32">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#6366f126_2px,transparent_2px)] bg-size-[36px_36px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <WandSparkles className="mr-2 size-4" />
            AI-Newsletter
          </Badge>

          <h1 className="text-5xl font-bold text-neutral-800 dark:text-white sm:text-6xl lg:text-7xl">
            Create Professional Newsletters in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                Minutes, Not Hours
              </span>
              <span
                aria-hidden
                className="absolute inset-0 z-20 bg-clip-text text-transparent sweep bg-linear-to-r from-transparent via-violet-500 to-transparent"
              >
                Minutes, Not Hours
              </span>
              {/* Underline */}
              <span className="absolute left-0 -bottom-0.5 h-[3.5px] w-full rounded-full bg-linear-to-r from-sky-600/65 via-violet-500/65 to-purple-600/65" />
            </span>
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-700 dark:text-gray-500 sm:text-xl">
            Stop spending hours curating content. Let AI transform your RSS
            feeds into engaging, inbox-ready newsletters.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButtons />
          </div>
        </div>
      </div>

      <HeroVisuals />
    </section>
  );
}
