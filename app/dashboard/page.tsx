import { WandSparkles } from "lucide-react";
import PageHeader from "@/components/ui/shared/page-header";
import RSSFeedManager from "@/components/ui/shared/rss-feed-manager";

export default function Dashboard() {
  return (
    <main className="min-h-screen flex-1 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 lg:px-8 lg:py-10">
        <div className="w-full max-w-4xl">
          <PageHeader
            title="Dashboard"
            icon={WandSparkles}
            description="Manage your RSS feeds and create AI newsletters"
          />
        </div>

        <RSSFeedManager />
      </div>
    </main>
  );
}
