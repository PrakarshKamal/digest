"use client";

import {
  ExternalLink,
  Globe,
  Newspaper,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RSSFeedManagerItem } from "./rss-feed-manager.types";

function formatLastFetched(lastFetched: Date | null) {
  if (!lastFetched) {
    return "Not fetched yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(lastFetched));
}

type FeedDetailsModalProps = {
  feed: RSSFeedManagerItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefresh: (feed: RSSFeedManagerItem) => void;
  onDelete: (feed: RSSFeedManagerItem) => void;
  isRefreshing: boolean;
  isDeleting: boolean;
};

export default function FeedDetailsModal({
  feed,
  open,
  onOpenChange,
  onRefresh,
  onDelete,
  isRefreshing,
  isDeleting,
}: FeedDetailsModalProps) {
  if (!feed) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-3">
          <Badge
            variant="secondary"
            className="w-fit border border-border bg-background/70 px-3 py-1 text-sm"
          >
            Feed details
          </Badge>
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-sm">
              <Globe className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <DialogTitle>{feed.title || "Untitled feed"}</DialogTitle>
              <DialogDescription>
                {feed.description ||
                  "This feed is saved. Refresh it to fetch metadata and recent articles from the source."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Feed URL
            </p>
            <a
              href={feed.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm text-blue-600 transition-colors hover:text-blue-700"
            >
              <span>{feed.url}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Articles
              </p>
              <div className="mt-2 inline-flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-muted-foreground" />
                <p className="text-2xl font-semibold tracking-tight">
                  {feed.count}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Last fetched
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                {formatLastFetched(feed.lastFetched)}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onRefresh(feed)}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Refreshing
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                {feed.lastFetched ? "Refresh Feed" : "Fetch Metadata"}
              </>
            )}
          </Button>

          <Button asChild type="button" variant="outline">
            <a href={feed.url} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open Source
            </a>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onDelete(feed)}
            disabled={isDeleting}
            className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Deleting Feed
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Feed
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
