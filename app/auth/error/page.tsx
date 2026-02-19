import { Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

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
        </div>

        {/* Error card */}
        <div className="glass rounded-2xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {params?.error
              ? `Error: ${params.error}`
              : "An unspecified error occurred during authentication."}
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent/10 hover:border-accent/60 active:scale-[0.98]"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
