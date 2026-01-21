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
            elements: {
              pricingTableCardHeader: {
                backgroundColor: "black dark:white",
                color: "black dark:white",
              },
              pricingTableCardTitle: {
                fontSize: compact ? "1.5rem" : "2rem",
                fontWeight: "bold",
                color: "black dark:white",
              },
              pricingTableCardDescription: {
                fontSize: compact ? "0.875rem" : "1rem",
                color: "black dark:white",
              },
              pricingTableCardFee: {
                color: "black dark:white",
              },
              pricingTableCardFeePeriod: {
                color: "black dark:white",
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
