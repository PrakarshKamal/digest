export const FREE_FEED_LIMIT = 3;
export const PRO_FEED_LIMIT = 10;

export function getFeedLimitForPlan({
  isMax,
  isPro,
}: {
  isMax: boolean;
  isPro: boolean;
}) {
  if (isMax) {
    return null;
  }

  if (isPro) {
    return PRO_FEED_LIMIT;
  }

  return FREE_FEED_LIMIT;
}

export function normalizeRssFeedUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    throw new Error("Please enter an RSS feed URL.");
  }

  const formattedUrl = /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(formattedUrl);
  } catch {
    throw new Error("Please enter a valid URL.");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Only HTTP and HTTPS RSS feed URLs are supported.");
  }

  parsedUrl.hash = "";

  return parsedUrl.toString();
}
