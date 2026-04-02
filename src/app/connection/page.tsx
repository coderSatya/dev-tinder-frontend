"use client";

import { useConnections } from "@/hooks/useConnections";
import { Connection } from "@/types/connection.types";
import { User as UserIcon, Mail, ExternalLink, Flame, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ConnectionPage() {
  const { connections, isLoading, isError } = useConnections();

  if (isLoading) {
    return (
      <div className="dt-root">
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="dt-root">
        <div className="flex h-[70vh] items-center justify-center text-white/40">
          Failed to load connections. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="dt-root">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4 dt-mono uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Flame className="h-3.5 w-3.5" />
            Network
          </div>
          <h1 className="dt-display text-4xl md:text-5xl text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Your <span className="dt-display-italic text-red-500">Connections</span>
          </h1>
          <p className="text-white/40 max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-1000">
            You have {connections.length} active connection{connections.length !== 1 ? "s" : ""}.{" "}
            These are the developers you&apos;ve matched with.
          </p>
        </div>

        {connections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((conn: Connection, idx: number) => (
              <div
                key={conn._id}
                className="dt-card dt-card-glass group overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative shrink-0">
                    {conn.photoUrl ? (
                      <img
                        src={conn.photoUrl}
                        alt={conn.firstName}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-red-500/50 transition-all duration-300 shadow-xl"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                        {conn.firstName.charAt(0)}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#141416] rounded-full shadow-lg" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-xl font-bold text-white truncate group-hover:text-red-500 transition-colors">
                      {conn.firstName} {conn.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-white/40 text-sm mt-0.5">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{conn.emailId}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed italic">
                    {conn.about || "No bio available."}
                  </p>
                </div>

                {conn.skills && conn.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {conn.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="dt-chip text-[10px] py-0.5 px-2 bg-white/5 border-white/5">
                        {skill}
                      </span>
                    ))}
                    {conn.skills.length > 4 && (
                      <span className="dt-chip text-[10px] py-0.5 px-2 bg-white/5 border-white/5">
                        +{conn.skills.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <Link
                    href={`/profile/${conn._id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all group/btn"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                  <button className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 text-red-500 hover:text-white transition-all">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto py-20 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <UserIcon className="h-10 w-10 text-white/20" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No connections yet</h2>
            <p className="text-white/40 mb-8">
              Start exploring the feed to find and connect with other developers matching your interests.
            </p>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-900/40"
            >
              Discover Developers
              <Flame className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}