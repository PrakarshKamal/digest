import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import DashboardHeader from "@/components/ui/shared/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      {children}
    </div>
  );
}
