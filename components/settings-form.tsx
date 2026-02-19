"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Proveri da li je kod tebe @/lib ili @/utils
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
      // Šaljemo podatke u bazu
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          display_name: displayName,
          username: username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
          bio,
          location,
          website,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (upsertError) throw upsertError;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save profile. Check if SQL tables are updated.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/sign-in"); // Ispravljena putanja na standardni login
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
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/protected"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-white/5 hover:text-foreground active:scale-95 border border-white/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-mono text-lg font-bold tracking-[0.2em] text-foreground italic uppercase">
          System Settings
        </h1>
      </div>

      {/* Profile Preview Card */}
      <div className="glass rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-2xl font-bold text-accent border border-accent/20 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
            {initials}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold italic tracking-tight text-foreground">
              {displayName || "Anonymous User"}
            </p>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              {username ? `@${username}` : user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
            <User className="h-3 w-3" />
            Core Identity
          </h2>

          <div className="grid gap-6">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Full Name / Alias"
                className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-accent/40 focus:bg-white/[0.05]"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Unique Handle</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  placeholder="username"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-10 py-3 text-sm text-foreground outline-none transition-all focus:border-accent/40"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Bio (160 chars)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Data transmission..."
                rows={3}
                maxLength={160}
                className="w-full resize-none rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-accent/40"
              />
            </div>

            {/* Location & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-10 py-3 text-sm text-foreground outline-none focus:border-accent/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-10 py-3 text-sm text-foreground outline-none focus:border-accent/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400 font-mono">
             ERROR: {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-400 font-mono">
            <Check className="h-3 w-3" />
            SYSTEM_UPDATE_SUCCESSFUL
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving}
          className={cn(
            "flex items-center justify-center gap-3 rounded-xl py-4 font-mono text-xs font-black uppercase tracking-[0.25em] transition-all active:scale-[0.98]",
            isSaving
              ? "bg-white/5 text-muted-foreground cursor-not-allowed"
              : "bg-accent text-accent-foreground shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
          )}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              Update Identity
            </>
          )}
        </button>
      </form>

      {/* Logout / Danger Zone */}
      <div className="glass rounded-2xl p-6 border border-white/5 bg-red-500/[0.02]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-foreground font-mono uppercase tracking-widest">Termination</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1 italic">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-tighter text-red-500 hover:bg-red-500/10 transition-all"
          >
            {isLoggingOut ? <Loader2 className="h-3 w-3 animate-spin" /> : <LogOut className="h-3 w-3" />}
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
