import { auth } from "@clerk/nextjs/server";
import {
  getRssFeedsByUserId,
  toRSSFeedManagerItem,
} from "@/lib/rss-feed-queries";
import { getFeedLimitForPlan } from "@/lib/rss-feeds";
import { upsertUser } from "@/lib/users";
import RSSFeedManagerClient from "./rss-feed-manager-client";

export default async function RSSFeedManager() {
  const { userId, has } = await auth();

  if (!userId) {
    return null;
  }

  const isMax = Boolean(await has({ plan: "max" }));
  const isPro = isMax ? false : Boolean(await has({ plan: "pro" }));
  const feedLimit = getFeedLimitForPlan({
    isMax,
    isPro,
  });
  const user = await upsertUser(userId);
  const feeds = await getRssFeedsByUserId(user.id);
  const items = feeds.map((feed) => toRSSFeedManagerItem(feed));

  return (
    <RSSFeedManagerClient
      feeds={items}
      feedLimit={feedLimit}
      canAddFeed={feedLimit === null || items.length < feedLimit}
    />
  );
}
