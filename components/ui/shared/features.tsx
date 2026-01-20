import { Rss, WandSparkles, Clock, Flame, History, Share } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Rss,
    title: "Plug In Your Sources",
    description:
      "Connect RSS feeds from blogs, news sites, and publications you trust. Digest pulls everything into one clean, centralized stream automatically.",
  },
  {
    icon: WandSparkles,
    title: "AI That Does the Reading",
    description:
      "Our AI scans, filters, and summarizes the most important stories so you don’t have to. Share clear, relevant insights your audience actually wants to read.",
  },
  {
    icon: History,
    title: "Newsletter History",
    description:
      "Access every newsletter you’ve generated in one place. Review past editions, track consistency, and reuse or refine content anytime.",
  },
  {
    icon: Clock,
    title: "Flexible Time Ranges",
    description:
      "Create newsletters based on daily, weekly, monthly, or custom time ranges. You decide how fresh or comprehensive each edition should be.",
  },
  {
    icon: Flame,
    title: "What’s Trending, Instantly",
    description:
      "Surface the top trending topics and themes across all your feeds. Spot patterns, breaking stories, and standout insights at a glance.",
  },
  {
    icon: Share,
    title: "Export Anywhere",
    description:
      "Export newsletters as HTML, PDF, or plain text. Publish to email, blogs, internal docs, or anywhere your audience lives.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Everything you need to create, curate, and deliver professional
            newsletters effortlessly.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
