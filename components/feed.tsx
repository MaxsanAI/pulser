"use client";

import { PulseComposer } from "./pulse-composer";
import { FeedCard, type PulseData } from "./feed-card";

// OVO JE KLJUČNA PROMENA: Feed sada prima "initialPosts" i "user"
export function Feed({ initialPosts, user }: { initialPosts: any[], user: any }) {
  
  // Pretvaramo podatke iz Supabase formata u format koji tvoj v0 dizajn razume
  const realPulses: PulseData[] = initialPosts?.map((post) => ({
    id: post.id,
    user: { 
      name: user?.email?.split('@')[0] || "User", 
      handle: `@${user?.email?.split('@')[0] || "user"}`, 
      avatar: user?.email?.[0].toUpperCase() || "P" 
    },
    content: post.content,
    timestamp: new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    likes: 0,
    replies: 0,
    shares: 0,
  })) || [];

  return (
    <main className="flex-1 overflow-y-auto border-x border-white/5">
      <div className="mx-auto max-w-2xl space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-mono text-xl font-black tracking-[0.3em] text-foreground italic">
            PULSERS
          </h1>
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
            <button className="rounded-md px-3 py-1 font-mono text-[10px] font-bold bg-accent text-accent-foreground">
              GLOBAL
            </button>
            <button className="rounded-md px-3 py-1 font-mono text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors">
              FOLLOWING
            </button>
          </div>
        </div>

        {/* Composer - ovde kucaš postove */}
        <PulseComposer />

        {/* Feed - ovde se prikazuju pravi postovi */}
        <div className="space-y-3 mt-8">
          {realPulses.length > 0 ? (
            realPulses.map((pulse) => (
              <FeedCard key={pulse.id} pulse={pulse} />
            ))
          ) : (
            // Ako nema postova u bazi, prikaži ovo:
            <div className="glass rounded-xl p-10 text-center border border-dashed border-white/10">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                No pulses detected in your area...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
