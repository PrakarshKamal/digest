"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-1", className)}
      classNames={{
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-4",
        caption:
          "relative flex items-center justify-center pt-1 text-sm font-medium",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "absolute left-0 h-8 w-8 rounded-full border-border/60 bg-background/80 p-0 opacity-80 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "absolute right-0 h-8 w-8 rounded-full border-border/60 bg-background/80 p-0 opacity-80 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground w-9 rounded-md text-[0.8rem] font-medium",
        week: "mt-2 flex w-full",
        day: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "h-9 w-9 rounded-xl p-0 font-normal aria-selected:opacity-100",
        ),
        day_button:
          "h-9 w-9 rounded-xl p-0 font-normal aria-selected:opacity-100",
        range_start:
          "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
        range_end:
          "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
        selected:
          "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
        today: "bg-muted text-foreground",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "bg-blue-500/10 text-foreground hover:bg-blue-500/20 hover:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({
          className: chevronClassName,
          orientation,
          ...iconProps
        }) =>
          orientation === "left" ? (
            <ChevronLeft
              className={cn("h-4 w-4", chevronClassName)}
              {...iconProps}
            />
          ) : (
            <ChevronRight
              className={cn("h-4 w-4", chevronClassName)}
              {...iconProps}
            />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
