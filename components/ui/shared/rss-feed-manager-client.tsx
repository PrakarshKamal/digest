"use client";

import {
  Clock3,
  Eye,
  Globe,
  Newspaper,
  Plus,
  RefreshCw,
  Rss,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import FeedDetailsModal from "./feed-details-modal";
import NewsletterGenerationPanel from "./newsletter-generation-panel";
import type {
  NewsletterDatePreset,
  RSSFeedManagerItem,
  RSSFeedManagerViewProps,
} from "./rss-feed-manager.types";
import {
  addRssFeed,
  deleteRssFeed,
  refreshRssFeed,
} from "./rss-feed-manager-actions";

function formatFeedCount(count: number) {
  return `${count} article${count === 1 ? "" : "s"}`;
}

function getUsageLabel(feedCount: number, feedLimit: number | null) {
  if (feedLimit === null) {
    return `${feedCount} feeds`;
  }

  return `${feedCount}/${feedLimit} feeds`;
}

function getActiveRangeLabel(
  activePreset: NewsletterDatePreset,
  customRange: DateRange | undefined,
) {
  if (activePreset === "24h") {
    return "Last 24h";
  }

  if (activePreset === "7d") {
    return "Last 7 days";
  }

  if (activePreset === "30d") {
    return "Last 30 days";
  }

  if (!customRange?.from || !customRange?.to) {
    return "a custom range";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).formatRange(customRange.from, customRange.to);
}

export default function RSSFeedManagerClient({
  feeds: initialFeeds,
  feedLimit,
  canAddFeed,
}: RSSFeedManagerViewProps) {
  const [feeds, setFeeds] = React.useState(initialFeeds);
  const [selectedFeedIds, setSelectedFeedIds] = React.useState<string[]>([]);
  const [detailFeedId, setDetailFeedId] = React.useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [feedUrl, setFeedUrl] = React.useState("");
  const [addError, setAddError] = React.useState<string | null>(null);
  const [actionMessage, setActionMessage] = React.useState<string | null>(null);
  const [composerMessage, setComposerMessage] = React.useState<string | null>(
    null,
  );
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [refreshError, setRefreshError] = React.useState<string | null>(null);
  const [deletingFeedId, setDeletingFeedId] = React.useState<string | null>(
    null,
  );
  const [refreshingFeedId, setRefreshingFeedId] = React.useState<string | null>(
    null,
  );
  const [instructions, setInstructions] = React.useState("");
  const [activePreset, setActivePreset] =
    React.useState<NewsletterDatePreset>("7d");
  const [customRange, setCustomRange] = React.useState<DateRange>();
  const [isAdding, startAddTransition] = React.useTransition();
  const [isDeleting, startDeleteTransition] = React.useTransition();
  const [isRefreshing, startRefreshTransition] = React.useTransition();

  React.useEffect(() => {
    setFeeds(initialFeeds);
  }, [initialFeeds]);

  React.useEffect(() => {
    setSelectedFeedIds((currentSelectedFeedIds) =>
      currentSelectedFeedIds.filter((feedId) =>
        feeds.some((feed) => feed.id === feedId),
      ),
    );
  }, [feeds]);

  React.useEffect(() => {
    if (!detailFeedId) {
      return;
    }

    if (!feeds.some((feed) => feed.id === detailFeedId)) {
      setDetailFeedId(null);
    }
  }, [detailFeedId, feeds]);

  const detailFeed = feeds.find((feed) => feed.id === detailFeedId) ?? null;
  const showUpgradeLink = !canAddFeed && feedLimit !== null;
  const selectedFeeds = feeds.filter((feed) =>
    selectedFeedIds.includes(feed.id),
  );
  const canGenerateNewsletter =
    selectedFeedIds.length > 0 &&
    (activePreset !== "custom" ||
      Boolean(customRange?.from && customRange?.to));

  const openAddFeedDialog = () => {
    setAddError(null);
    setIsAddDialogOpen(true);
  };

  const handleAddFeed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddError(null);
    setActionMessage(null);

    startAddTransition(async () => {
      const result = await addRssFeed({
        url: feedUrl,
      });

      if (!result.success) {
        setAddError(result.error);
        return;
      }

      setFeeds((currentFeeds) => [result.feed, ...currentFeeds]);
      setSelectedFeedIds((currentSelectedFeedIds) => [
        result.feed.id,
        ...currentSelectedFeedIds.filter((feedId) => feedId !== result.feed.id),
      ]);
      setActionMessage(
        result.message ??
          "Feed added successfully and selected for your draft.",
      );
      setComposerMessage(null);
      setFeedUrl("");
      setIsAddDialogOpen(false);
    });
  };

  const handleDeleteFeed = (feed: RSSFeedManagerItem) => {
    if (
      !window.confirm(
        `Delete "${feed.title || feed.url}"? This will also remove its saved articles.`,
      )
    ) {
      return;
    }

    setDeleteError(null);
    setDeletingFeedId(feed.id);

    startDeleteTransition(async () => {
      const result = await deleteRssFeed(feed.id);

      if (!result.success) {
        setDeleteError(result.error);
        setDeletingFeedId(null);
        return;
      }

      setFeeds((currentFeeds) =>
        currentFeeds.filter(
          (currentFeed) => currentFeed.id !== result.deletedFeedId,
        ),
      );
      setSelectedFeedIds((currentSelectedFeedIds) =>
        currentSelectedFeedIds.filter(
          (feedId) => feedId !== result.deletedFeedId,
        ),
      );
      setActionMessage("Feed deleted successfully.");
      setComposerMessage(null);

      if (detailFeedId === result.deletedFeedId) {
        setDetailFeedId(null);
      }

      setDeletingFeedId(null);
    });
  };

  const handleRefreshFeed = (feed: RSSFeedManagerItem) => {
    setRefreshError(null);
    setActionMessage(null);
    setRefreshingFeedId(feed.id);

    startRefreshTransition(async () => {
      const result = await refreshRssFeed(feed.id);

      if (!result.success) {
        setRefreshError(result.error);
        setRefreshingFeedId(null);
        return;
      }

      setFeeds((currentFeeds) =>
        currentFeeds.map((currentFeed) =>
          currentFeed.id === result.feed.id ? result.feed : currentFeed,
        ),
      );
      setActionMessage(
        result.message ?? "Feed metadata refreshed successfully.",
      );
      setRefreshingFeedId(null);
    });
  };

  const toggleFeedSelection = (feedId: string) => {
    setComposerMessage(null);
    setSelectedFeedIds((currentSelectedFeedIds) =>
      currentSelectedFeedIds.includes(feedId)
        ? currentSelectedFeedIds.filter(
            (currentFeedId) => currentFeedId !== feedId,
          )
        : [...currentSelectedFeedIds, feedId],
    );
  };

  const handleSelectAllFeeds = () => {
    setComposerMessage(null);
    setSelectedFeedIds(feeds.map((feed) => feed.id));
  };

  const handleClearSelection = () => {
    setComposerMessage(null);
    setSelectedFeedIds([]);
  };

  const handlePresetChange = (
    preset: Exclude<NewsletterDatePreset, "custom">,
  ) => {
    setComposerMessage(null);
    setActivePreset(preset);
  };

  const handleCustomRangeChange = (range: DateRange | undefined) => {
    setComposerMessage(null);
    setCustomRange(range);

    if (range?.from && range.to) {
      setActivePreset("custom");
    }
  };

  const handleResetForm = () => {
    setInstructions("");
    setCustomRange(undefined);
    setActivePreset("7d");
    setComposerMessage(null);
  };

  const handleGenerate = () => {
    if (!canGenerateNewsletter) {
      return;
    }

    setComposerMessage(
      `Newsletter form ready. ${selectedFeedIds.length} feed${selectedFeedIds.length === 1 ? "" : "s"} selected over ${getActiveRangeLabel(activePreset, customRange)}. Next step is wiring this form into the generation pipeline.`,
    );
  };

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.95fr)]">
        <Card className="order-2 overflow-hidden rounded-3xl border-border/60 shadow-sm xl:order-1">
          <CardHeader className="gap-6 border-b border-border/60 bg-card/60">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">RSS Feeds</CardTitle>
                  <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
                    Add and manage the RSS sources that power your newsletter
                    workflow.
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Badge
                  variant="secondary"
                  className="border border-border bg-background/70 px-3 py-1 text-sm"
                >
                  {getUsageLabel(feeds.length, feedLimit)}
                </Badge>

                <Button
                  type="button"
                  onClick={openAddFeedDialog}
                  disabled={!canAddFeed || isAdding}
                  className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Feed
                </Button>
              </div>
            </div>

            {showUpgradeLink ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  You&apos;ve reached your feed limit for this plan.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/#pricing">Upgrade Plan</Link>
                </Button>
              </div>
            ) : null}

            {deleteError ? (
              <p className="text-sm text-destructive">{deleteError}</p>
            ) : null}
            {refreshError ? (
              <p className="text-sm text-destructive">{refreshError}</p>
            ) : null}
            {actionMessage ? (
              <p className="text-sm text-muted-foreground">{actionMessage}</p>
            ) : null}
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            {feeds.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border/70 bg-muted/20 px-6 py-14 text-center">
                <div className="mx-auto flex max-w-md flex-col items-center gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <Rss className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">
                      No feeds yet
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                      Start by adding an RSS feed URL. Once it&apos;s added, you
                      can select it for newsletter generation and open the full
                      feed details in a modal.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={openAddFeedDialog}
                    className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Your First Feed
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {feeds.map((feed) => {
                  const isSelected = selectedFeedIds.includes(feed.id);
                  const isDeletingFeed =
                    isDeleting && deletingFeedId === feed.id;

                  return (
                    <div
                      key={feed.id}
                      className={cn(
                        "rounded-3xl border bg-card transition-all",
                        isSelected
                          ? "border-blue-500/50 shadow-md ring-1 ring-blue-500/10"
                          : "border-border/60 hover:border-blue-500/30 hover:shadow-sm",
                      )}
                    >
                      <div className="flex items-start gap-4 p-5 sm:p-6">
                        <div className="pt-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleFeedSelection(feed.id)}
                            aria-label={`Select ${feed.title || feed.url}`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleFeedSelection(feed.id)}
                          className="flex min-w-0 flex-1 flex-col items-start gap-3 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                              <Globe className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 space-y-1">
                              <h3 className="truncate text-base font-semibold sm:text-lg">
                                {feed.title || "Untitled feed"}
                              </h3>
                              <p className="line-clamp-1 break-all text-sm text-muted-foreground">
                                {feed.url}
                              </p>
                            </div>
                          </div>

                          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {feed.description ||
                              "Metadata hasn't been fetched yet. Use refresh to pull feed details and recent articles."}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Badge
                              variant="outline"
                              className="rounded-full px-2.5 py-1"
                            >
                              <Newspaper className="h-3.5 w-3.5" />
                              {formatFeedCount(feed.count)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="rounded-full px-2.5 py-1"
                            >
                              <Clock3 className="h-3.5 w-3.5" />
                              {feed.lastFetched ? "Fetched" : "Not fetched"}
                            </Badge>
                          </div>
                        </button>

                        <div className="flex shrink-0 flex-col gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDetailFeedId(feed.id)}
                          >
                            <Eye className="h-4 w-4" />
                            View details
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteFeed(feed)}
                            disabled={isDeletingFeed}
                            className="self-end text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            {isDeletingFeed ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <NewsletterGenerationPanel
          feeds={feeds}
          selectedFeeds={selectedFeeds}
          selectedFeedIds={selectedFeedIds}
          instructions={instructions}
          activePreset={activePreset}
          customRange={customRange}
          canAddFeed={canAddFeed}
          canGenerate={canGenerateNewsletter}
          composerMessage={composerMessage}
          onSelectAllFeeds={handleSelectAllFeeds}
          onClearSelection={handleClearSelection}
          onPresetChange={handlePresetChange}
          onCustomRangeChange={handleCustomRangeChange}
          onInstructionsChange={setInstructions}
          onResetForm={handleResetForm}
          onGenerate={handleGenerate}
          onOpenAddFeed={openAddFeedDialog}
        />
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add RSS Feed</DialogTitle>
            <DialogDescription>
              Paste an RSS feed URL to add it to your workspace. We&apos;ll save
              it first, then try to fetch its metadata and recent articles right
              away.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddFeed} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="feed-url"
                className="text-sm font-medium text-foreground"
              >
                RSS Feed URL
              </label>
              <input
                id="feed-url"
                type="url"
                placeholder="https://example.com/feed.xml"
                value={feedUrl}
                onChange={(event) => setFeedUrl(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="border border-border bg-muted/40 px-3 py-1 text-sm"
              >
                {getUsageLabel(feeds.length, feedLimit)}
              </Badge>
              {feedLimit === null ? (
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-700"
                >
                  Unlimited feeds
                </Badge>
              ) : null}
            </div>

            {addError ? (
              <p className="text-sm text-destructive">{addError}</p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setAddError(null);
                }}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isAdding || !canAddFeed}
                className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
              >
                {isAdding ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Adding Feed
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Feed
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <FeedDetailsModal
        feed={detailFeed}
        open={Boolean(detailFeed)}
        onOpenChange={(open) => {
          if (!open) {
            setDetailFeedId(null);
          }
        }}
        onRefresh={handleRefreshFeed}
        onDelete={handleDeleteFeed}
        isRefreshing={Boolean(
          detailFeed && isRefreshing && refreshingFeedId === detailFeed.id,
        )}
        isDeleting={Boolean(
          detailFeed && isDeleting && deletingFeedId === detailFeed.id,
        )}
      />
    </>
  );
}
