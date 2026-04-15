import { prisma } from "@/lib/prisma";
import { upsertArticlesForFeed } from "@/lib/rss-article-service";
import {
  countFeedsByUserId,
  findFeedByIdForUser,
  findFeedByUserAndUrl,
  getFeedWithArticleCount,
  toRSSFeedManagerItem,
} from "@/lib/rss-feed-queries";
import { isFeedRefreshFresh, normalizeRssFeedUrl } from "@/lib/rss-feeds";
import { fetchAndParseRssFeed } from "@/lib/rss-parser";

export async function createRssFeedForUser({
  feedLimit,
  rawUrl,
  userId,
}: {
  feedLimit: number | null;
  rawUrl: string;
  userId: string;
}) {
  const normalizedUrl = normalizeRssFeedUrl(rawUrl);

  if (feedLimit !== null) {
    const currentFeedCount = await countFeedsByUserId(userId);

    if (currentFeedCount >= feedLimit) {
      throw new Error(
        `You've reached your feed limit of ${feedLimit}. Upgrade your plan to add more feeds.`,
      );
    }
  }

  const existingFeed = await findFeedByUserAndUrl(userId, normalizedUrl);

  if (existingFeed) {
    throw new Error("This RSS feed is already in your workspace.");
  }

  return prisma.rssFeed.create({
    data: {
      url: normalizedUrl,
      userId,
    },
  });
}

export async function refreshRssFeedForUser(userId: string, feedId: string) {
  const feed = await findFeedByIdForUser(userId, feedId);

  if (!feed) {
    throw new Error("That RSS feed couldn't be found.");
  }

  if (isFeedRefreshFresh(feed.lastFetched)) {
    const cachedFeed = await getFeedWithArticleCount(feed.id);

    if (!cachedFeed) {
      throw new Error(
        "That RSS feed couldn't be found after loading cached data.",
      );
    }

    return {
      feed: toRSSFeedManagerItem(cachedFeed),
      usedCache: true,
    };
  }

  const parsedFeed = await fetchAndParseRssFeed(feed.id, feed.url);

  await prisma.rssFeed.update({
    where: {
      id: feed.id,
    },
    data: {
      description: parsedFeed.description,
      imageUrl: parsedFeed.imageUrl,
      language: parsedFeed.language,
      lastFetched: new Date(),
      link: parsedFeed.link,
      title: parsedFeed.title,
    },
  });

  await upsertArticlesForFeed(feed.id, parsedFeed.articles);

  const refreshedFeed = await getFeedWithArticleCount(feed.id);

  if (!refreshedFeed) {
    throw new Error("That RSS feed couldn't be found after refreshing.");
  }

  return {
    feed: toRSSFeedManagerItem(refreshedFeed),
    usedCache: false,
  };
}

export async function deleteRssFeedForUser(userId: string, feedId: string) {
  const existingFeed = await findFeedByIdForUser(userId, feedId);

  if (!existingFeed) {
    throw new Error("That RSS feed couldn't be found.");
  }

  await prisma.rssArticle.deleteMany({
    where: {
      feedId,
    },
  });

  await prisma.rssFeed.delete({
    where: {
      id: feedId,
    },
  });
}
