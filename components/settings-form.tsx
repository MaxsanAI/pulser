"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  User,
  AtSign,
  FileText,
  MapPin,
  Globe,
  Save,
  Loader2,
  LogOut,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";

interface Profile {
  id: string;
  display_name: string | null;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  website: string | null;
}

export function SettingsForm({
  user,
  profile,
}: {
  user: SupabaseUser;
  profile: Profile | null;
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsSaving(true);
    setError(null);
    setSaved(false);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          display_name: displayName,
          username: username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
          bio,
          location,
          website,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.charAt(0).toUpperCase() || "?";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground active:scale-95"
          aria-label="Back to feed"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-mono text-lg font-bold tracking-widest text-foreground">
          SETTINGS
        </h1>
      </div>

      {/* Profile Avatar Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-2xl font-bold text-accent">
            {initials}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-foreground">
              {displayName || "Your Name"}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {username ? `@${username}` : user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <User className="h-4 w-4" />
            Profile Information
          </h2>

          <div className="flex flex-col gap-5">
            {/* Display Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="display-name"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <User className="h-3 w-3" />
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <AtSign className="h-3 w-3" />
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                  @
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                    )
                  }
                  placeholder="your_username"
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 pl-9 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="bio"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <FileText className="h-3 w-3" />
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the world about yourself..."
                rows={3}
                maxLength={160}
                className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-sm leading-relaxed text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
              <span className="self-end font-mono text-xs text-muted-foreground">
                {bio.length}/160
              </span>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <MapPin className="h-3 w-3" />
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="website"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <Globe className="h-3 w-3" />
                Website
              </label>
              <input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <Check className="h-4 w-4" />
            Profile saved successfully
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98]",
            isSaving
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-accent text-accent-foreground glow-accent-sm hover:brightness-110"
          )}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </form>

      {/* Danger Zone */}
      <div className="glass rounded-2xl p-6">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Account
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-destructive transition-all duration-200 hover:bg-destructive/10 hover:border-destructive/60 active:scale-95"
          >
            {isLoggingOut ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <LogOut className="h-3 w-3" />
            )}
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
