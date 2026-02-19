"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  UserPlus,
  Newspaper,
  CloudSun,
  Cloud,
  Sun,
  Droplets,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function RightPanel() {
  const [weather, setWeather] = useState({ temp: "--", condition: "Loading...", location: "Locating..." });
  const [loadingWeather, setLoadingWeather] = useState(true);

  // FETCH REAL WEATHER DATA
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await res.json();
        
        // Jednostavna logika za ikone
        const temp = Math.round(data.current_weather.temperature);
        setWeather({
          temp: temp.toString(),
          condition: data.current_weather.weathercode < 3 ? "Clear Sky" : "Cloudy",
          location: "Your Location"
        });
      } catch (err) {
        console.error("Weather failed", err);
      } finally {
        setLoadingWeather(false);
      }
    });
  }, []);

  return (
    <aside className="hidden w-80 flex-shrink-0 space-y-4 overflow-y-auto p-4 xl:block">
      
      {/* Dynamic Weather Widget */}
      <section className="glass rounded-xl p-4 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="mb-3 flex items-center gap-2 text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">
          <CloudSun className="h-3 w-3 text-accent" />
          <h2>Real-time Weather</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {loadingWeather ? (
              <Loader2 className="h-6 w-6 animate-spin text-accent/20" />
            ) : (
              <>
                <p className="text-3xl font-black tracking-tighter text-foreground italic">
                  {weather.temp}°C
                </p>
                <p className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-widest">
                  {weather.condition}
                </p>
              </>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
             <Sun className="h-6 w-6 text-accent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Trending Section (Ovo ostavljamo slično, ali sa neon efektima) */}
      <section className="glass rounded-xl p-4 border border-white/5">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">
          <TrendingUp className="h-3 w-3 text-purple-500" />
          <h2>Trending Pulses</h2>
        </div>
        <div className="space-y-4">
          {[
            { tag: "#NextJS16", pulses: "42K", category: "Tech" },
            { tag: "#CloudflareAI", pulses: "12K", category: "AI" },
            { tag: "#Supabase", pulses: "8K", category: "Dev" }
          ].map((trend) => (
            <div key={trend.tag} className="group cursor-pointer">
              <p className="text-[10px] text-white/20 font-bold uppercase">{trend.category}</p>
              <p className="text-sm font-bold group-hover:text-accent transition-colors">{trend.tag}</p>
              <p className="text-[10px] text-white/40">{trend.pulses} pulses</p>
            </div>
          ))}
        </div>
      </section>

      {/* Breaking News (Mesto za Cloudflare AI) */}
      <section className="glass rounded-xl p-4 border border-white/5 bg-accent/5">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">
          <Newspaper className="h-3 w-3 text-blue-400" />
          <h2>AI News Summary</h2>
        </div>
        <div className="space-y-4 text-xs italic text-white/70 leading-relaxed">
          <p className="border-l-2 border-accent pl-3">
            "AI models are now capable of generating full social media architectures in seconds..." 
            <span className="block mt-1 text-[9px] text-white/20 uppercase not-italic">Summarized by PulsersAI</span>
          </p>
        </div>
      </section>

      {/* Footer info */}
      <div className="px-4 py-2 text-[9px] font-mono text-white/10 uppercase tracking-widest">
        © 2026 Pulsers Network // v1.0.4-beta
      </div>
    </aside>
  );
}
