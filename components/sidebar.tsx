"use client";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Home,
  Compass,
  User,
  Settings,
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center justify-between border-r border-border bg-surface py-6 lg:w-20">
      {/* Logo */}
      <div className="flex flex-col items-center gap-8">
        <Link
          href="/"
          className="group flex h-10 w-10 items-center justify-center rounded-lg bg-accent transition-all duration-200 glow-accent-sm hover:scale-105 active:scale-95"
          aria-label="PULSERS Home"
        >
          <Zap className="h-5 w-5 text-accent-foreground transition-transform duration-200 group-hover:rotate-12" />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive && "drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]"
                  )}
                />
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-surface-elevated px-3 py-1.5 font-mono text-xs text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                  {item.label}
                </span>
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -left-[calc(50%-2px)] top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent lg:-left-[calc(50%-6px)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-4">
        {/* Create Pulse button */}
        <Link
          href="/"
          className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all duration-200 glow-accent-sm hover:scale-105 hover:brightness-110 active:scale-95"
          aria-label="Create Pulse"
        >
          <Zap className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-surface-elevated px-3 py-1.5 font-mono text-xs text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
            Create Pulse
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-card hover:text-destructive active:scale-95"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-surface-elevated px-3 py-1.5 font-mono text-xs text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
}
