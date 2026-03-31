"use client";

import { SignOutButton } from "@clerk/nextjs";
import { History, Home, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlanBadge } from "@/components/ui/shared/plan-badge";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/dashboard/history",
    label: "History",
    icon: History,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "/dashboard/account",
    label: "Account",
    icon: User,
  },
];

export function DashboardHeaderClient() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digest
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={active ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2 transition-all",
                        active &&
                          "bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <PlanBadge />
            <SignOutButton>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </SignOutButton>
          </div>
        </div>
      </div>

      <nav className="md:hidden flex items-center gap-1 pb-3 px-6 lg:px-8">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={active ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2 transition-all",
                  active &&
                    "bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
