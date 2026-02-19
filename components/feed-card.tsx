"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PulseData {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  replies: number;
  shares: number;
}

export function FeedCard({ pulse }: { pulse: PulseData }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(pulse.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <article className="glass glass-hover rounded-xl p-4 transition-all duration-300">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-bold text-accent">
          {pulse.user.avatar}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-foreground">
              {pulse.user.name}
            </span>
            <span className="truncate font-mono text-xs text-muted-foreground">
              {pulse.user.handle}
            </span>
            <span className="text-muted-foreground" aria-hidden="true">
              {"·"}
            </span>
            <time className="flex-shrink-0 font-mono text-xs text-muted-foreground">
              {pulse.timestamp}
            </time>
            <button
              className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground active:scale-90"
              aria-label="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Text content */}
          <p className="mt-1.5 text-[15px] leading-relaxed text-card-foreground">
            {pulse.content}
          </p>

          {/* Image */}
          {pulse.image && (
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              <div className="aspect-video w-full bg-muted/50" role="img" aria-label="Pulse image attachment">
                <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                  {pulse.image}
                </div>
              </div>
            </div>
          )}

          {/* Interaction bar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Reply */}
              <button
                className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-muted-foreground transition-all duration-200 hover:bg-accent-blue/10 hover:text-accent-blue active:scale-90"
                aria-label={`Reply, ${pulse.replies} replies`}
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-mono text-xs">{pulse.replies}</span>
              </button>

              {/* Like */}
              <button
                onClick={handleLike}
                className={cn(
                  "group flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-all duration-200 active:scale-90",
                  liked
                    ? "text-rose-500"
                    : "text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                )}
                aria-label={liked ? "Unlike" : "Like"}
                aria-pressed={liked}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-200 group-hover:scale-110",
                    liked && "fill-current"
                  )}
                />
                <span className="font-mono text-xs">{likeCount}</span>
              </button>

              {/* Share */}
              <button
                className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-muted-foreground transition-all duration-200 hover:bg-emerald-500/10 hover:text-emerald-500 active:scale-90"
                aria-label={`Share, ${pulse.shares} shares`}
              >
                <Share2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-mono text-xs">{pulse.shares}</span>
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 active:scale-90",
                bookmarked
                  ? "text-accent"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
              )}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
              aria-pressed={bookmarked}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  bookmarked && "fill-current"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
