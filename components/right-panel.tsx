"use client";

import {
  TrendingUp,
  UserPlus,
  Newspaper,
  CloudSun,
  Cloud,
  Sun,
  Droplets,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const trendingPulses = [
  { tag: "#AIRevolution", pulses: "12.4K", category: "Technology" },
  { tag: "#NightCity", pulses: "8.7K", category: "Culture" },
  { tag: "#QuantumLeap", pulses: "6.2K", category: "Science" },
  { tag: "#CyberPunk2077", pulses: "5.1K", category: "Gaming" },
  { tag: "#DarkMode", pulses: "4.8K", category: "Design" },
];

const suggestedUsers = [
  { name: "Nova Chen", handle: "@nova_dev", avatar: "NC" },
  { name: "Kai Tanaka", handle: "@kai_creates", avatar: "KT" },
  { name: "Zara Okonkwo", handle: "@zara_pulse", avatar: "ZO" },
];

const breakingNews = [
  {
    headline: "Global Tech Summit Announces Breakthrough in Quantum Computing",
    source: "TechPulse",
    time: "2m ago",
  },
  {
    headline: "New Framework Challenges React Dominance in Web Development",
    source: "DevWire",
    time: "15m ago",
  },
  {
    headline: "Space Agency Confirms Signal Detection from Proxima Centauri",
    source: "ScienceDaily",
    time: "32m ago",
  },
  {
    headline: "Major Cybersecurity Vulnerability Found in Popular IoT Devices",
    source: "SecurityNow",
    time: "1h ago",
  },
];

const weatherData = {
  temp: "18",
  condition: "Partly Cloudy",
  humidity: "62%",
  location: "San Francisco, CA",
};

function WeatherIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Sunny":
      return <Sun className="h-8 w-8 text-amber-400" />;
    case "Cloudy":
      return <Cloud className="h-8 w-8 text-muted-foreground" />;
    default:
      return <CloudSun className="h-8 w-8 text-accent-blue" />;
  }
}

export function RightPanel() {
  return (
    <aside className="hidden w-80 flex-shrink-0 space-y-4 overflow-y-auto p-4 xl:block" role="complementary" aria-label="Dashboard sidebar">
      {/* Weather Widget */}
      <section className="glass rounded-xl p-4" aria-label="Weather">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <CloudSun className="h-4 w-4" />
          <h2 className="font-mono text-xs uppercase tracking-wider">
            Weather
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {weatherData.temp}&deg;C
            </p>
            <p className="text-sm text-muted-foreground">
              {weatherData.condition}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {weatherData.location}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <WeatherIcon condition={weatherData.condition} />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Droplets className="h-3 w-3" />
              <span>{weatherData.humidity}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Pulses */}
      <section className="glass rounded-xl p-4" aria-label="Trending Pulses">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <h2 className="font-mono text-xs uppercase tracking-wider">
            Trending Pulses
          </h2>
        </div>
        <div className="space-y-3">
          {trendingPulses.map((trend) => (
            <button
              key={trend.tag}
              className="group flex w-full flex-col rounded-lg px-2 py-1.5 text-left transition-all duration-200 hover:bg-card active:scale-[0.98]"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {trend.category}
              </span>
              <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {trend.tag}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {trend.pulses} pulses
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Breaking News */}
      <section className="glass rounded-xl p-4" aria-label="Breaking News">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <Newspaper className="h-4 w-4" />
          <h2 className="font-mono text-xs uppercase tracking-wider">
            Breaking News
          </h2>
        </div>
        <div className="space-y-3">
          {breakingNews.map((news, i) => (
            <button
              key={i}
              className="group flex w-full flex-col gap-1 rounded-lg px-2 py-1.5 text-left transition-all duration-200 hover:bg-card active:scale-[0.98]"
            >
              <p className="text-sm leading-snug text-card-foreground transition-colors group-hover:text-foreground">
                {news.headline}
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>{news.source}</span>
                <span aria-hidden="true">{"/"}</span>
                <span>{news.time}</span>
                <ExternalLink className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Who to Follow */}
      <section className="glass rounded-xl p-4" aria-label="Who to follow">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground">
          <UserPlus className="h-4 w-4" />
          <h2 className="font-mono text-xs uppercase tracking-wider">
            Who to Follow
          </h2>
        </div>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div
              key={user.handle}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 hover:bg-card"
            >
              <div
                className={cn(
                  "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent"
                )}
              >
                {user.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {user.handle}
                </p>
              </div>
              <button className="flex-shrink-0 rounded-lg border border-accent/30 px-3 py-1 font-mono text-xs text-accent transition-all duration-200 hover:bg-accent/10 hover:border-accent/60 active:scale-95">
                Follow
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
