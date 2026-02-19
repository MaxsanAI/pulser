"use client";

import { createClient } from "@/lib/supabase/client";
import { Zap, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/`,
          data: {
            display_name: displayName,
            username: username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
          },
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent glow-accent">
            <Zap className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-widest text-foreground">
            PULSERS
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account
          </p>
        </div>

        {/* Sign up card */}
        <div className="glass rounded-2xl p-6">
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            {/* Display Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="display-name"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                placeholder="Nova Chen"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                  @
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="nova_dev"
                  required
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                    )
                  }
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 pl-9 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Repeat Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="repeat-password"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Confirm Password
              </label>
              <input
                id="repeat-password"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98]",
                isLoading
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-accent text-accent-foreground glow-accent-sm hover:brightness-110"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Login link */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-accent transition-colors hover:text-accent/80"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
