"use client";

import { useFeed } from "@/hooks/useFeed";
import FeedCarousel from "@/components/FeedCarousel";
import { RefreshCw, Loader2 } from "lucide-react";

export default function Feed() {
  const { feed, isLoading, isError, refetch } = useFeed();

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-white/40">Something went wrong loading the feed.</p>
        <button
          onClick={() => refetch()}
          className="dt-btn-outline px-8 py-3 text-sm border-white/10 hover:border-red-500/50 hover:text-red-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-8 p-4 text-center">
        <div className="p-8 rounded-full bg-white/5 border border-white/10 shadow-2xl relative">
          <RefreshCw className="h-14 w-14 text-white/20 animate-spin-slow" />
          <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full" />
        </div>
        <div className="space-y-3 max-w-sm">
          <h3 className="dt-display text-4xl text-[#f0ede8]">
            End of the <span className="dt-display-italic text-[#DC2626]">Line</span>
          </h3>
          <p className="text-white/40 font-medium leading-relaxed">
            You&apos;ve explored all currently active developers. Check back soon for fresh talent!
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="dt-btn-outline px-10 py-3 text-sm border-white/10 hover:border-red-500/50 hover:text-red-500"
        >
          Refresh Discovery
        </button>
      </div>
    );
  }

  return <FeedCarousel feed={feed} />;
}