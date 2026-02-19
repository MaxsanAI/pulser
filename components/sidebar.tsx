"use client";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Proveri da li je @/utils ili @/lib
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

// IZMENJENE PUTANJE: Koristimo /protected jer tamo tvoj starter drži bazu
const navItems = [
  { icon: Home, label: "Home", href: "/protected" }, 
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: User, label: "Profile", href: "/protected" }, // Privremeno na protected dok ne napraviš profile page
  { icon: Settings, label: "Settings", href: "/protected" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // VODI NA SIGN-IN: Ovo je standardna putanja u tvom starteru
    router.push("/sign-in");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center justify-between border-r border-white/5 bg-[#050505] py-6 lg:w-20">
      <div className="flex flex-col items-center gap-8">
        {/* Logo vodi na protected feed */}
        <Link
          href="/protected"
          className="group flex h-10 w-10 items-center justify-center rounded-lg bg-accent transition-all duration-200 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95"
        >
          <Zap className="h-5 w-5 text-accent-foreground transition-transform duration-200 group-hover:rotate-12" />
        </Link>

        <nav className="flex flex-col items-center gap-2">
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
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]")} />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#111] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 border border-white/5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Logout Dugme */}
        <button
          onClick={handleLogout}
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 active:scale-95"
        >
          <LogOut className="h-4 w-4" />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#111] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 border border-white/5">
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
}
