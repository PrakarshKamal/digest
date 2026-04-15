export type RSSFeedManagerItem = {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  count: number;
  lastFetched: Date | null;
};

export type NewsletterDatePreset = "24h" | "7d" | "30d" | "custom";

export type RSSFeedManagerViewProps = {
  feeds: RSSFeedManagerItem[];
  feedLimit: number | null;
  canAddFeed: boolean;
};
