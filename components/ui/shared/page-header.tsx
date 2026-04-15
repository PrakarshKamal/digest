import type { LucideIcon } from "lucide-react";

export type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function PageHeader({
  icon: Icon,
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-0 bg-linear-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
