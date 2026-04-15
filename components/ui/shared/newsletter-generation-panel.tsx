"use client";

import {
  CalendarDays,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type {
  NewsletterDatePreset,
  RSSFeedManagerItem,
} from "./rss-feed-manager.types";

const DATE_PRESET_LABELS: Record<NewsletterDatePreset, string> = {
  "24h": "Last 24h",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  custom: "Custom range",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(value);
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from && !range?.to) {
    return "Pick a custom range";
  }

  if (range.from && !range.to) {
    return `${formatDate(range.from)} - Pick an end date`;
  }

  if (range.from && range.to) {
    return `${formatDate(range.from)} - ${formatDate(range.to)}`;
  }

  return "Pick a custom range";
}

type NewsletterGenerationPanelProps = {
  feeds: RSSFeedManagerItem[];
  selectedFeeds: RSSFeedManagerItem[];
  selectedFeedIds: string[];
  instructions: string;
  activePreset: NewsletterDatePreset;
  customRange: DateRange | undefined;
  canAddFeed: boolean;
  canGenerate: boolean;
  composerMessage: string | null;
  onSelectAllFeeds: () => void;
  onClearSelection: () => void;
  onPresetChange: (preset: Exclude<NewsletterDatePreset, "custom">) => void;
  onCustomRangeChange: (range: DateRange | undefined) => void;
  onInstructionsChange: (value: string) => void;
  onResetForm: () => void;
  onGenerate: () => void;
  onOpenAddFeed: () => void;
};

export default function NewsletterGenerationPanel({
  feeds,
  selectedFeeds,
  selectedFeedIds,
  instructions,
  activePreset,
  customRange,
  canAddFeed,
  canGenerate,
  composerMessage,
  onSelectAllFeeds,
  onClearSelection,
  onPresetChange,
  onCustomRangeChange,
  onInstructionsChange,
  onResetForm,
  onGenerate,
  onOpenAddFeed,
}: NewsletterGenerationPanelProps) {
  const hasFeeds = feeds.length > 0;
  const hasSelection = selectedFeedIds.length > 0;
  const isAllSelected = hasFeeds && selectedFeedIds.length === feeds.length;

  return (
    <Card className="order-1 overflow-hidden rounded-3xl border-border/60 shadow-sm xl:order-2">
      <CardHeader className="gap-6 border-b border-border/60 bg-card/60">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Newsletter Composer</CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
                Pick your feeds, choose the date window, and add any custom
                guidance before generating an AI-assisted newsletter draft.
              </CardDescription>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="border border-border bg-background/70 px-3 py-1 text-sm"
          >
            {selectedFeedIds.length} selected
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6 sm:p-8">
        {!hasFeeds ? (
          <div className="rounded-3xl border border-dashed border-border/70 bg-muted/20 px-6 py-12 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  Add a feed before generating
                </h3>
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  Newsletter generation starts with at least one RSS source. Add
                  a feed first, then come back here to choose the sources and
                  time window for this draft.
                </p>
              </div>
              <Button
                type="button"
                onClick={onOpenAddFeed}
                disabled={!canAddFeed}
                className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
              >
                Add Your First Feed
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Sources for this newsletter
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select feeds from the list to decide what the AI should
                    analyze.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onSelectAllFeeds}
                    disabled={isAllSelected}
                  >
                    Select all feeds
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onClearSelection}
                    disabled={!hasSelection}
                  >
                    Clear selection
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedFeeds.length > 0 ? (
                  selectedFeeds.map((feed) => (
                    <Badge
                      key={feed.id}
                      variant="outline"
                      className="rounded-full border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm text-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                      {feed.title || feed.url}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No feeds selected yet. Pick one or more feeds from the list.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Date range
                </p>
                <p className="text-sm text-muted-foreground">
                  Start with a quick preset or choose a custom date window.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(["24h", "7d", "30d"] as const).map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={activePreset === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPresetChange(preset)}
                    className={
                      activePreset === preset
                        ? "bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
                        : undefined
                    }
                  >
                    {DATE_PRESET_LABELS[preset]}
                  </Button>
                ))}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={
                        activePreset === "custom" ? "default" : "outline"
                      }
                      size="sm"
                      className={
                        activePreset === "custom"
                          ? "bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
                          : undefined
                      }
                    >
                      <CalendarDays className="h-4 w-4" />
                      {activePreset === "custom"
                        ? formatRange(customRange)
                        : DATE_PRESET_LABELS.custom}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={customRange?.from}
                      selected={customRange}
                      onSelect={onCustomRangeChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  Active window:{" "}
                  <span className="text-muted-foreground">
                    {activePreset === "custom"
                      ? formatRange(customRange)
                      : DATE_PRESET_LABELS[activePreset]}
                  </span>
                </div>
                {activePreset === "custom" &&
                (!customRange?.from || !customRange?.to) ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choose both a start and end date for the custom range.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label
                  htmlFor="newsletter-instructions"
                  className="text-sm font-semibold text-foreground"
                >
                  Custom instructions
                </label>
                <p className="text-sm text-muted-foreground">
                  Add preferences for tone, topics to prioritize, or anything
                  else the AI should keep in mind.
                </p>
              </div>
              <Textarea
                id="newsletter-instructions"
                value={instructions}
                onChange={(event) => onInstructionsChange(event.target.value)}
                placeholder="Example: prioritize product launches, major funding, and practical developer tooling updates. Keep the tone concise and operator-focused."
                className="min-h-32"
              />
            </div>

            {composerMessage ? (
              <p className="text-sm text-muted-foreground">{composerMessage}</p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={onResetForm}>
                <RefreshCw className="h-4 w-4" />
                Reset form
              </Button>
              <Button
                type="button"
                onClick={onGenerate}
                disabled={!canGenerate}
                className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700"
              >
                <Sparkles className="h-4 w-4" />
                Generate Newsletter
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
