import { PricingCards } from "./pricing-cards";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container mx-auto scroll-mt-24 px-4 py-16 md:py-24"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that works best for you. Cancel anytime.
        </p>
      </div>
      <div className="mx-auto mt-16 flex justify-center">
        <PricingCards />
      </div>
    </section>
  );
};
