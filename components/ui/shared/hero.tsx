import { WandSparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButtons } from "./CTAButtons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 py-20 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <WandSparkles className="mr-2 size-4" />
            AI-Newsletter
          </Badge>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-neutral-800 dark:text-white sm:text-6xl lg:text-7xl">
        Create Professional Newsletters in{" "}
        <span className="relative inline-block">
          <span className="relative z-10 bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            Minutes Not Hours
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-20 bg-clip-text text-transparent sweep
                 bg-linear-to-r from-transparent via-violet-500 to-transparent"
          >
            Minutes Not Hours
          </span>
          {/* Underline */}
          <span className="absolute left-0 -bottom-0.5 h-[3.5px] w-full rounded-full bg-linear-to-r from-sky-600/65 via-violet-500/65 to-purple-600/65" />
        </span>
      </h1>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <CTAButtons />
      </div>

      {/* Top 5 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-gray-200 dark:border-gray-800 p-2 bg-blue-50 dark:bg-blue-950/30">
          <div className="h-2 w-3/4 rounded bg-blue-300/50 dark:bg-blue-700/50" />
        </div>
        <div className="rounded border border-gray-200 dark:border-gray-800 p-2 bg-purple-50 dark:bg-purple-950/30">
          <div className="h-2 w-3/4 rounded bg-purple-300/50 dark:bg-purple-700/50" />
        </div>
      </div>
    </section>
  );
}
