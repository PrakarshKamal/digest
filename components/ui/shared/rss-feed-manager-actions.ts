"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {
  getFeedWithArticleCount,
  toRSSFeedManagerItem,
} from "@/lib/rss-feed-queries";
import {
  createRssFeedForUser,
  deleteRssFeedForUser,
  refreshRssFeedForUser,
} from "@/lib/rss-feed-service";
import { getFeedLimitForPlan } from "@/lib/rss-feeds";
import { upsertUser } from "@/lib/users";
import type { RSSFeedManagerItem } from "./rss-feed-manager.types";

type RssFeedActionResult =
  | {
      success: true;
      feed: RSSFeedManagerItem;
      message?: string;
    }
  | {
      success: false;
      error: string;
    };

type DeleteRssFeedActionResult =
  | {
      success: true;
      deletedFeedId: string;
    }
  | {
      success: false;
      error: string;
    };

async function getCurrentUserWithLimit() {
  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("You need to be signed in to manage RSS feeds.");
  }

  const isMax = Boolean(await has({ plan: "max" }));
  const isPro = isMax ? false : Boolean(await has({ plan: "pro" }));
  const feedLimit = getFeedLimitForPlan({
    isMax,
    isPro,
  });
  const user = await upsertUser(userId);

  return {
    feedLimit,
    user,
  };
}

export async function addRssFeed(input: {
  url: string;
}): Promise<RssFeedActionResult> {
  try {
    const { user, feedLimit } = await getCurrentUserWithLimit();
    const feed = await createRssFeedForUser({
      feedLimit,
      rawUrl: input.url,
      userId: user.id,
    });

    try {
      const refreshedFeed = await refreshRssFeedForUser(user.id, feed.id);

      revalidatePath("/dashboard");

      return {
        success: true,
        feed: refreshedFeed.feed,
      };
    } catch (error) {
      revalidatePath("/dashboard");

      const savedFeed = await getFeedWithArticleCount(feed.id);

      return {
        success: true,
        feed: savedFeed
          ? toRSSFeedManagerItem(savedFeed)
          : toRSSFeedManagerItem({
              ...feed,
              _count: {
                articles: 0,
              },
            }),
        message:
          error instanceof Error
            ? `Feed saved, but we couldn't fetch metadata yet: ${error.message}`
            : "Feed saved, but we couldn't fetch metadata yet.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't add that RSS feed right now.",
    };
  }
}

export async function refreshRssFeed(
  feedId: string,
): Promise<RssFeedActionResult> {
  try {
    const { user } = await getCurrentUserWithLimit();
    const refreshedFeed = await refreshRssFeedForUser(user.id, feedId);

    revalidatePath("/dashboard");

    return {
      success: true,
      feed: refreshedFeed.feed,
      message: refreshedFeed.usedCache
        ? "This feed was refreshed recently, so we kept the cached version from the last 3 hours."
        : "Feed metadata refreshed successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't refresh that RSS feed right now.",
    };
  }
}

export async function deleteRssFeed(
  feedId: string,
): Promise<DeleteRssFeedActionResult> {
  try {
    const { user } = await getCurrentUserWithLimit();
    await deleteRssFeedForUser(user.id, feedId);

    revalidatePath("/dashboard");

    return {
      success: true,
      deletedFeedId: feedId,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't delete that RSS feed right now.",
    };
  }
}
