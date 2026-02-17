import { HelpCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How does Digest pick stories from my feeds?",
    answer:
      "Digest scans all connected sources, identifies high-signal posts by relevance and recency, then generates concise summaries so you can publish faster without missing important updates.",
  },
  {
    question: "Can I control the date range for each newsletter?",
    answer:
      "Yes. You can generate editions from daily, weekly, monthly, or custom date windows. This lets you choose whether each issue should be quick and fresh or more comprehensive.",
  },
  {
    question: "Do I need technical setup to get started?",
    answer:
      "No technical setup is required. Add your RSS sources, choose a time range, and Digest handles the processing and newsletter draft generation for you.",
  },
  {
    question: "Can I edit the generated content before publishing?",
    answer:
      "Absolutely. Digest gives you a polished draft that you can review, refine, and adjust for tone before exporting or publishing to your preferred channel.",
  },
  {
    question: "Where can I export my newsletter?",
    answer:
      "You can export in multiple formats including HTML, PDF, and plain text, so you can publish to email platforms, websites, internal docs, or social channels.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Plans are flexible and you can cancel at any time with no long-term contract.",
  },
];

export const FAQ = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <HelpCircle className="mr-2 size-4" />
            Frequently asked questions
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Everything you need to know
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Quick answers about setup, workflow, and publishing with Digest.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-colors open:border-blue-300 open:bg-blue-50/40 dark:border-gray-700 dark:bg-gray-800 dark:open:border-blue-400/70 dark:open:bg-blue-500/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                <span className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                  {faq.question}
                </span>
                <Plus className="size-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-45 dark:text-gray-400" />
              </summary>
              <p className="mt-4 pr-9 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
