import { PricingTable } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";

type PricingCardsProps = {
  compact?: boolean;
};

export const PricingCards = ({ compact = false }: PricingCardsProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className={compact ? "max-w-4xl w-full" : "max-w-5xl w-full"}>
        <PricingTable
          appearance={{
            variables: {
              colorForeground: "var(--foreground)",
              colorBackground: "var(--card)",
              colorMutedForeground: "var(--muted-foreground)",
            },
            elements: {
              pricingTableCardHeader: {
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
              },
              pricingTableCardTitle: {
                fontSize: compact ? "1.5rem" : "2rem",
                fontWeight: "bold",
                color: "var(--foreground)",
              },
              pricingTableCardDescription: {
                fontSize: compact ? "0.875rem" : "1rem",
                color: "var(--muted-foreground)",
              },
              pricingTableCardFee: {
                color: "var(--foreground)",
              },
              pricingTableCardFeePeriod: {
                color: "var(--muted-foreground)",
              },
            },
          }}
          fallback={
            <div className="flex items-center justify-center py-12">
              <Spinner className="size-10" />
            </div>
          }
        />
      </div>
    </div>
  );
};
