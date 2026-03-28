"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function UserCard({ user }) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-8, 8]);
  const rightOpacity = useTransform(x, [0, 150], [0, 1]);
  const leftOpacity = useTransform(x, [-150, 0], [1, 0]);

  return (
    <motion.div
      className="w-full max-w-[360px] mx-auto"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={() => x.set(0)}
    >
      <Card className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
        {/* Image */}
        <img
          src={user.photoUrl}
          alt="user"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Swipe Indicators */}
        <motion.div
          style={{ opacity: rightOpacity }}
          className="absolute top-6 right-6 text-green-400 font-bold text-lg"
        >
          CONNECT
        </motion.div>

        <motion.div
          style={{ opacity: leftOpacity }}
          className="absolute top-6 left-6 text-red-400 font-bold text-lg"
        >
          IGNORE
        </motion.div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 w-full p-6 text-white space-y-3">
          {/* Name */}
          <h2 className="text-3xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60">
                  +{user.skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* About */}
          <p className="text-sm text-white/70 line-clamp-2">
            {user.about || "No bio available"}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <Button
              onClick={() => console.log("Ignored")}
              className="flex-1 bg-white/10 text-white hover:bg-red-500"
            >
              <X className="mr-2" /> Ignore
            </Button>

            <Button
              onClick={() => console.log("Connected")}
              className="flex-1 bg-white text-black font-bold hover:bg-green-400"
            >
              <Check className="mr-2" /> Connect
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
