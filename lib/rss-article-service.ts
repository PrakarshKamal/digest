import { prisma } from "@/lib/prisma";
import type { ParsedFeed } from "@/lib/rss-parser";

export async function upsertArticlesForFeed(
  feedId: string,
  articles: ParsedFeed["articles"],
) {
  for (const article of articles) {
    await prisma.rssArticle.upsert({
      where: {
        guid: article.guidSource,
      },
      update: {
        author: article.author,
        categories: article.categories,
        content: article.content,
        imageUrl: article.imageUrl,
        link: article.link,
        pubDate: article.pubDate,
        sourceFeedIds: [feedId],
        summary: article.summary,
        title: article.title,
      },
      create: {
        author: article.author,
        categories: article.categories,
        content: article.content,
        feedId,
        guid: article.guidSource,
        imageUrl: article.imageUrl,
        link: article.link,
        pubDate: article.pubDate,
        sourceFeedIds: [feedId],
        summary: article.summary,
        title: article.title,
      },
    });
  }
}
