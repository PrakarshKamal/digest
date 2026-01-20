import { Rss, Cog, Clock } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Rss,
    title: "Connect Your Sources",
    description:
      "Plug in RSS feeds from your favorite blogs, news sites, and publications. We'll automatically pull in the latest content.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    icon: Clock,
    title: "Customize Time Ranges",
    description: "Set daily, weekly, or custom timeframes to control freshness",
    color: "from-emerald-500 to-green-500",
  },
  {
    number: 3,
    icon: Cog,
    title: "AI Processing",
    description:
      "AI scans, filters, and summarizes the most important stories. It identifies trends and creates engaging summaries tailored to your audience.",
    color: "from-purple-500 to-pink-500",
    animated: true,
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Three simple steps to transform your feeds into professional
            newsletters
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block mt-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-blue-500 via-emerald-500 to-purple-500" />

            <div className="space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 1;

                return (
                  <div
                    key={step.number}
                    className={`relative flex items-center ${
                      isEven ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Card */}
                    <div
                      className={`w-5/12 ${
                        isEven ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br ${step.color} text-white mb-4 ${
                            isEven ? "float-right" : "float-left"
                          }`}
                        >
                          {step.animated ? (
                            <Icon
                              className="h-8 w-8 animate-spin-slow"
                              aria-label="Processing"
                            />
                          ) : step.number === 1 ? (
                            <Icon className="h-8 w-8 animate-pulse" />
                          ) : (
                            <Icon className="h-8 w-8" />
                          )}
                        </div>
                        <div className="clear-both">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center z-10 shadow-lg">
                      <div
                        className={`w-10 h-10 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden mt-16">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-green-500" />

            <div className="space-y-12">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative flex items-start">
                    {/* Timeline Node */}
                    <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg">
                      <div
                        className={`w-10 h-10 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br ${step.color} text-white mb-4`}
                        >
                          {step.animated ? (
                            <Icon
                              className="h-6 w-6 animate-spin-slow"
                              aria-label="Processing"
                            />
                          ) : step.number === 1 ? (
                            <Icon className="h-6 w-6 animate-pulse" />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
