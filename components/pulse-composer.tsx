"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Video, Zap, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export function PulseComposer() {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const handlePulse = () => {
    if (!text.trim()) return;
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div
      className={cn(
        "glass rounded-xl p-4 transition-all duration-300",
        isFocused && "border-accent/30 shadow-[0_0_30px_rgba(124,58,237,0.08)]"
      )}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-bold text-accent">
          Y
        </div>

        {/* Input area */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's pulsing?"
            className="w-full resize-none bg-transparent text-base leading-relaxed text-foreground placeholder-muted-foreground outline-none"
            rows={1}
            aria-label="Compose a new pulse"
          />

          {/* Actions bar */}
          <div
            className={cn(
              "mt-3 flex items-center justify-between border-t border-border pt-3 transition-all duration-300",
              !isFocused && !text && "opacity-60"
            )}
          >
            <div className="flex items-center gap-1">
              <button
                className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-90"
                aria-label="Upload image"
              >
                <ImageIcon className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />
              </button>
              <button
                className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent-blue/10 hover:text-accent-blue active:scale-90"
                aria-label="Upload video"
              >
                <Video className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />
              </button>
              <button
                className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-amber-500/10 hover:text-amber-400 active:scale-90"
                aria-label="Add emoji"
              >
                <Smile className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />
              </button>
            </div>

            {/* Character count + Pulse button */}
            <div className="flex items-center gap-3">
              {text.length > 0 && (
                <span
                  className={cn(
                    "font-mono text-xs",
                    text.length > 280 ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {text.length}/280
                </span>
              )}
              <button
                onClick={handlePulse}
                disabled={!text.trim() || text.length > 280}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-95",
                  text.trim() && text.length <= 280
                    ? "bg-accent text-accent-foreground glow-accent-sm hover:brightness-110"
                    : "cursor-not-allowed bg-muted text-muted-foreground"
                )}
                aria-label="Send pulse"
              >
                <Zap className="h-4 w-4" />
                <span>Pulse</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
