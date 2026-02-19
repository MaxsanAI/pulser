"use client";

import { PulseComposer } from "./pulse-composer";
import { FeedCard, type PulseData } from "./feed-card";

const samplePulses: PulseData[] = [
  {
    id: "1",
    user: { name: "Nova Chen", handle: "@nova_dev", avatar: "NC" },
    content:
      "Just shipped a new dark mode implementation using CSS custom properties. The trick? Using oklch color space for perceptually uniform gradients. Zero flickering on page load.",
    timestamp: "2m",
    likes: 128,
    replies: 24,
    shares: 15,
  },
  {
    id: "2",
    user: { name: "Kai Tanaka", handle: "@kai_creates", avatar: "KT" },
    content:
      "The future of web development is not about frameworks. It's about understanding the platform. Web APIs have gotten insanely powerful - view transitions, container queries, anchor positioning. Stop adding dependencies, start learning the spec.",
    image: "architecture-diagram.webp",
    timestamp: "15m",
    likes: 342,
    replies: 67,
    shares: 89,
  },
  {
    id: "3",
    user: { name: "Zara Okonkwo", handle: "@zara_pulse", avatar: "ZO" },
    content:
      "Hot take: AI won't replace developers. But developers who use AI will replace those who don't. The real skill is knowing what to ask and how to validate the output.",
    timestamp: "1h",
    likes: 891,
    replies: 156,
    shares: 234,
  },
  {
    id: "4",
    user: { name: "Marcus Rivera", handle: "@marcus_r", avatar: "MR" },
    content:
      "Built a real-time collaborative editor this weekend. Used CRDTs instead of OT. The difference in conflict resolution is night and day. Sharing my learnings in a thread below.",
    image: "editor-screenshot.webp",
    timestamp: "2h",
    likes: 267,
    replies: 43,
    shares: 51,
  },
  {
    id: "5",
    user: { name: "Aisha Patel", handle: "@aisha_codes", avatar: "AP" },
    content:
      "Reminder: accessibility is not a feature. It's a requirement. If your app can't be navigated with a keyboard, it's broken. Period. Run axe-core in your CI pipeline.",
    timestamp: "3h",
    likes: 512,
    replies: 78,
    shares: 167,
  },
  {
    id: "6",
    user: { name: "Liam O'Brien", handle: "@liam_tech", avatar: "LO" },
    content:
      "Quantum computing just crossed 1000 logical qubits. We're entering a new era. The encryption protocols we rely on today have maybe 5-10 years before they're obsolete. Start planning your post-quantum migration now.",
    timestamp: "5h",
    likes: 1024,
    replies: 203,
    shares: 445,
  },
];

export function Feed() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-lg font-bold tracking-widest text-foreground">
            PULSERS
          </h1>
          <div className="flex gap-1">
            <button className="rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-accent transition-all duration-200 hover:bg-accent/10 active:scale-95">
              For You
            </button>
            <button className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground active:scale-95">
              Following
            </button>
          </div>
        </div>

        {/* Composer */}
        <PulseComposer />

        {/* Feed */}
        <div className="space-y-3">
          {samplePulses.map((pulse) => (
            <FeedCard key={pulse.id} pulse={pulse} />
          ))}
        </div>
      </div>
    </main>
  );
}
