"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRequest } from "./useRequest";
import { ConnectionRequest } from "@/types/request.types";
import { Check, X, User as UserIcon, Clock, Flame } from "lucide-react";
import Link from "next/link";

interface RequestListProps {
  initialRequests: ConnectionRequest[];
}

export default function RequestList({ initialRequests }: RequestListProps) {
  const { setRequests } = useAuthStore();
  const { requests, isProcessing, handleReview } = useRequest();

  // Sync initial server data with Zustand store
  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests, setRequests]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4 dt-mono uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </div>
        <h1 className="dt-display text-4xl md:text-5xl text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Connection <span className="dt-display-italic text-red-500">Requests</span>
        </h1>
        <p className="text-white/40 max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Manage incoming requests from other developers. Review their profiles and decide who to connect with.
        </p>
      </div>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req, idx) => (
            <div 
              key={req._id}
              className="dt-card dt-card-glass group flex flex-col md:flex-row items-center gap-6 p-6 animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Profile Section */}
              <div className="flex items-center gap-5 flex-1 w-full">
                <div className="relative shrink-0">
                  {req.fromUserId.photoUrl ? (
                    <img 
                      src={req.fromUserId.photoUrl} 
                      alt={req.fromUserId.firstName} 
                      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-red-500/50 transition-all duration-300 shadow-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {req.fromUserId.firstName.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 border-2 border-[#141416] rounded-full shadow-lg flex items-center justify-center">
                    <Flame className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white truncate group-hover:text-red-500 transition-colors">
                      {req.fromUserId.firstName} {req.fromUserId.lastName}
                    </h3>
                  </div>
                  <p className="text-white/40 text-sm italic line-clamp-1 mb-3">
                    {req.fromUserId.about || "No bio available."}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {req.fromUserId.skills?.slice(0, 3).map((skill) => (
                      <span key={skill} className="dt-chip text-[9px] py-0.5 px-2">
                        {skill}
                      </span>
                    ))}
                    {req.fromUserId.skills && req.fromUserId.skills.length > 3 && (
                      <span className="dt-chip text-[9px] py-0.5 px-2">
                        +{req.fromUserId.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <Link 
                  href={`/profile/${req.fromUserId._id}`}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all text-center"
                >
                  Profile
                </Link>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReview("rejected", req._id)}
                    disabled={isProcessing === req._id}
                    className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 text-red-500/60 hover:text-red-500 transition-all disabled:opacity-50"
                    title="Reject Request"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleReview("accepted", req._id)}
                    disabled={isProcessing === req._id}
                    className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:border-green-500 text-green-500 hover:text-white transition-all disabled:opacity-50 shadow-lg shadow-green-900/10"
                    title="Accept Request"
                  >
                    {isProcessing === req._id ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check className="h-5 w-5" />
                    )}
                  </button>
                </div>
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
          <h2 className="text-2xl font-bold text-white mb-2">No pending requests</h2>
          <p className="text-white/40 mb-8">
            Check back later for new connection requests or keep swiping to find more developers!
          </p>
          <Link 
            href="/feed" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-900/40"
          >
            Explore Feed
            <Flame className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
