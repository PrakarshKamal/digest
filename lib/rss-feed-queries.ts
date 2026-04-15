import type { RSSFeedManagerItem } from "@/components/ui/shared/rss-feed-manager.types";
import { prisma } from "@/lib/prisma";

const feedWithArticleCountInclude = {
  _count: {
    select: {
      articles: true,
    },
  },
} as const;

type FeedWithArticleCount = Awaited<ReturnType<typeof getFeedWithArticleCount>>;

export function toRSSFeedManagerItem(
  feed: NonNullable<FeedWithArticleCount>,
): RSSFeedManagerItem {
  return {
    count: feed._count.articles,
    description: feed.description,
    id: feed.id,
    lastFetched: feed.lastFetched,
    title: feed.title,
    url: feed.url,
  };
}

export function countFeedsByUserId(userId: string) {
  return prisma.rssFeed.count({
    where: {
      userId,
    },
  });
}

export function findFeedByIdForUser(userId: string, feedId: string) {
  return prisma.rssFeed.findFirst({
    where: {
      id: feedId,
      userId,
    },
  });
}

export function findFeedByUserAndUrl(userId: string, url: string) {
  return prisma.rssFeed.findUnique({
    where: {
      userId_url: {
        url,
        userId,
      },
    },
  });
}

export function getFeedWithArticleCount(feedId: string) {
  return prisma.rssFeed.findUnique({
    where: {
      id: feedId,
    },
    include: feedWithArticleCountInclude,
  });
}

export function getRssFeedsByUserId(userId: string) {
  return prisma.rssFeed.findMany({
    where: {
      userId,
    },
    include: feedWithArticleCountInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}
