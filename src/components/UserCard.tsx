"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { FeedUser } from "@/types/feed.types";
import { useSendRequest } from "@/hooks/useSendRequest";

interface UserCardProps {
  user: FeedUser;
}

export default function UserCard({ user }: UserCardProps) {
  const { handleSendRequest } = useSendRequest();
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-8, 8]);
  const rightOpacity = useTransform(x, [0, 150], [0, 1]);
  const leftOpacity = useTransform(x, [-150, 0], [1, 0]);

  return (
    <motion.div
      className="w-full max-w-[360px] mx-auto cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) {
          handleSendRequest("interested", user?._id);
        } else if (info.offset.x < -100) {
          handleSendRequest("ignored", user?._id);
        }
        x.set(0);
      }}
    >
      <Card className="relative h-[520px] rounded-[28px] overflow-hidden shadow-2xl border border-white/10 bg-[#141416]">
        {/* Image */}
        <img
          src={user.photoUrl}
          alt="user"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />

        {/* Swipe Indicators */}
        <motion.div
          style={{ opacity: rightOpacity }}
          className="absolute top-8 right-8 text-[#22c55e] font-black text-xl dt-display italic tracking-widest border-4 border-[#22c55e] px-4 py-1 rounded-xl rotate-12"
        >
          LIKE
        </motion.div>

        <motion.div
          style={{ opacity: leftOpacity }}
          className="absolute top-8 left-8 text-[#DC2626] font-black text-xl dt-display italic tracking-widest border-4 border-[#DC2626] px-4 py-1 rounded-xl -rotate-12"
        >
          NOPE
        </motion.div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 w-full p-8 text-[#f0ede8] space-y-4">
          <div className="space-y-1">
            <h2 className="dt-display text-4xl">
              {user.firstName}{" "}
              <span className="dt-display-italic text-[#DC2626]">
                {user.lastName}
              </span>
            </h2>
            <div className="dt-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
              Full Stack Developer
            </div>
          </div>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="dt-chip bg-white/5 border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* About */}
          <p className="text-sm text-white/50 line-clamp-2 font-medium leading-relaxed">
            {user.about || "No bio available"}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => handleSendRequest("ignored", user?._id)}
              className="flex-1 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-all active:scale-95 group"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={() => handleSendRequest("interested", user?._id)}
              className="flex-[2] h-12 flex items-center justify-center rounded-2xl bg-[#DC2626] text-white font-bold hover:bg-[#b91c1c] shadow-lg shadow-red-900/20 transition-all active:scale-95 group"
            >
              <Check className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Connect
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
