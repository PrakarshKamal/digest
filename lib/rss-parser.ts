import { createHash } from "node:crypto";
import Parser from "rss-parser";

const DEFAULT_FETCH_TIMEOUT_MS = 10_000;
const MAX_ARTICLES_PER_REFRESH = 50;

type ParsedFeedArticle = {
  guidSource: string;
  title: string;
  link: string;
  content: string | null;
  summary: string | null;
  pubDate: Date;
  author: string | null;
  categories: string[];
  imageUrl: string | null;
};

export type ParsedFeed = {
  title: string | null;
  description: string | null;
  link: string | null;
  imageUrl: string | null;
  language: string | null;
  articles: ParsedFeedArticle[];
};

type FeedImageField = {
  url?: string;
};

type FeedCustomFields = {
  language?: string;
  image?: FeedImageField;
};

type MediaField = {
  url?: string;
  type?: string;
};

type ItemCustomFields = {
  "media:content"?: MediaField[];
  "media:thumbnail"?: MediaField[];
};

const parser = new Parser<FeedCustomFields, ItemCustomFields>({
  customFields: {
    feed: ["language"],
    item: [
      ["media:content", { keepArray: true }],
      ["media:thumbnail", { keepArray: true }],
    ],
  },
});

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ");
}

function normalizeText(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalizedValue = stripHtml(value).replace(/\s+/g, " ").trim();

  return normalizedValue || null;
}

function normalizeRawText(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue || null;
}

function parseDate(value: string | null | undefined) {
  if (!value) {
    return new Date();
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.valueOf())) {
    return new Date();
  }

  return parsedDate;
}

function buildFeedScopedGuid(feedId: string, guidSource: string) {
  return `${feedId}:${createHash("sha256").update(guidSource).digest("hex")}`;
}

function getItemImageUrl(item: Parser.Item & ItemCustomFields) {
  const enclosureUrl =
    item.enclosure?.type?.startsWith("image/") && item.enclosure.url
      ? item.enclosure.url
      : null;
  const mediaContentUrl = item["media:content"]?.find(
    (media) => media.url,
  )?.url;
  const mediaThumbnailUrl = item["media:thumbnail"]?.find(
    (media) => media.url,
  )?.url;

  return enclosureUrl || mediaContentUrl || mediaThumbnailUrl || null;
}

function parseItem(
  feedId: string,
  item: Parser.Item & ItemCustomFields,
): ParsedFeedArticle | null {
  const link = normalizeRawText(item.link);

  if (!link) {
    return null;
  }

  const rawGuid =
    normalizeRawText(item.guid) ||
    normalizeRawText(item.link) ||
    normalizeText(item.title) ||
    link;

  return {
    author: normalizeText(item.creator),
    categories: (item.categories ?? []).filter(Boolean),
    content: normalizeRawText(item.content) || normalizeRawText(item.summary),
    guidSource: buildFeedScopedGuid(feedId, rawGuid),
    imageUrl: getItemImageUrl(item),
    link,
    pubDate: parseDate(item.isoDate || item.pubDate),
    summary: normalizeText(item.summary || item.contentSnippet || item.content),
    title: normalizeText(item.title) || "Untitled article",
  };
}

export async function fetchAndParseRssFeed(feedId: string, url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    DEFAULT_FETCH_TIMEOUT_MS,
  );

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "Digest RSS Bot/1.0 (+https://digest.local)",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Feed request failed with status ${response.status}.`);
    }

    const xml = await response.text();
    const parsed = await parser.parseString(xml);
    const articles = parsed.items
      .slice(0, MAX_ARTICLES_PER_REFRESH)
      .map((item) => parseItem(feedId, item))
      .filter((item): item is ParsedFeedArticle => Boolean(item));

    return {
      articles,
      description: normalizeText(parsed.description),
      imageUrl: normalizeRawText(parsed.image?.url || parsed.itunes?.image),
      language: normalizeRawText(parsed.language),
      link: normalizeRawText(parsed.link),
      title: normalizeText(parsed.title),
    } satisfies ParsedFeed;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The RSS feed request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
