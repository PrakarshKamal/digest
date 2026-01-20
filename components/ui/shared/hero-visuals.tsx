"use client";

import { ArrowDown, MoveRight, Rss, WandSparkles } from "lucide-react";

export const HeroVisuals = () => {
  return (
    <div className="relative mx-auto mt-16 max-w-7xl px-4 lg:px-8">
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-8 lg:py-12">
        {/* Left: RSS feeds */}
        <div className="relative z-10 flex flex-col items-center gap-6 shrink-0">
          <div className="text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
            RSS Feeds
          </div>
          <div className="flex flex-col gap-5">
            {[
              { color: "emerald", name: "Feed 1" },
              { color: "purple", name: "Feed 2" },
              { color: "blue", name: "Feed 3" },
            ].map((feed, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-4"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div
                  className={`relative size-16 lg:size-20 rounded-full shadow-xl flex items-center justify-center animate-pulse ring-3 ${
                    feed.color === "emerald"
                      ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/50 ring-emerald-400/30"
                      : feed.color === "purple"
                        ? "bg-linear-to-br from-purple-500 to-purple-600 shadow-purple-500/50 ring-purple-400/30"
                        : "bg-linear-to-br from-blue-500 to-blue-600 shadow-blue-500/50 ring-blue-400/30"
                  }`}
                >
                  <Rss className="size-7 lg:size-9 text-white drop-shadow-lg" />
                  {/* Pulse rings */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 animate-ping ${
                      feed.color === "emerald"
                        ? "border-emerald-400"
                        : feed.color === "purple"
                          ? "border-purple-400"
                          : "border-blue-400"
                    }`}
                  />
                </div>
                <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium">
                  {feed.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow from RSS Feeds to AI Magic */}
        <div className="relative z-10 hidden lg:flex items-center shrink-0">
          <MoveRight className="size-12 lg:size-14 text-blue-600 dark:text-blue-400 animate-pulse drop-shadow-md" />
        </div>

        {/* Mobile: Vertical arrow pointing down from RSS Feeds */}
        <div className="relative z-10 flex justify-center lg:hidden shrink-0">
          <ArrowDown className="size-10 text-blue-600 dark:text-blue-400 animate-bounce drop-shadow-md" />
        </div>

        {/* Center: AI Magic - Single Large Badge */}
        <div className="relative z-10 flex items-center justify-center shrink-0">
          <div className="relative flex items-center gap-4 px-8 lg:px-10 py-5 lg:py-4 rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 shadow-2xl border-2 border-white/20 backdrop-blur-sm animate-pulse ring-4 ring-blue-400/30">
            <WandSparkles className="size-7 lg:size-9 text-white drop-shadow-lg animate-pulse" />
            <span className="text-base lg:text-lg font-semibold text-white tracking-wide">
              AI-Magic
            </span>
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/10 to-transparent animate-ping opacity-75" />
          </div>
        </div>

        {/* Arrow from AI Magic to Newsletter */}
        <div className="relative z-10 hidden lg:flex items-center shrink-0">
          <MoveRight className="size-12 lg:size-14 text-indigo-600 dark:text-indigo-400 animate-pulse drop-shadow-md" />
        </div>

        {/* Mobile: Vertical arrow pointing down from AI Magic */}
        <div className="relative z-10 flex justify-center lg:hidden shrink-0">
          <ArrowDown className="size-10 text-indigo-600 dark:text-indigo-400 animate-bounce drop-shadow-md" />
        </div>

        {/* Right: Newsletter */}
        <div className="relative z-10 w-full lg:w-auto flex-1 max-w-sm lg:max-w-md">
          <div className="rounded-2xl border-2 border-blue-500/30 dark:border-blue-400/40 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 px-6 py-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent" />
              <div className="relative flex items-center gap-2 mb-2">
                <WandSparkles className="size-4 text-white drop-shadow-md animate-pulse" />
                <span className="text-xs font-medium text-white/90 tracking-wide">
                  Your Newsletter
                </span>
              </div>
              <div className="relative h-4 w-3/4 rounded bg-white/90 mb-2 shadow-sm" />
              <div className="relative h-3 w-1/2 rounded bg-white/70 shadow-sm" />
            </div>
            <div className="p-6 space-y-4 bg-linear-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
                  <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    5 Titles
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full rounded bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                  <div className="h-2 w-5/6 rounded bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                </div>
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
                  <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Content
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full rounded bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                  <div className="h-2 w-full rounded bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                  <div className="h-2 w-3/4 rounded bg-linear-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-lg border border-blue-200 dark:border-blue-900/50 p-2.5 bg-linear-to-br from-blue-50 to-blue-50 dark:from-blue-950/30 dark:to-blue-950/30 shadow-sm">
                  <div className="h-2 w-3/4 rounded bg-linear-to-r from-blue-300/60 to-blue-400/40 dark:from-blue-700/60 dark:to-blue-600/40" />
                </div>
                <div className="rounded-lg border border-blue-200 dark:border-blue-900/50 p-2.5 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-sm">
                  <div className="h-2 w-3/4 rounded bg-linear-to-r from-emerald-300/60 to-emerald-400/40 dark:from-emerald-700/60 dark:to-blue-600/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
