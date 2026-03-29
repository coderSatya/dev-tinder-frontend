"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const pathname = usePathname();
  const router = useRouter();

  console.log("AuthProvider DEBUG:", { isAuthenticated, isLoading, pathname });

  useEffect(() => {
    console.log("AuthProvider: Initial profile fetch...");
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!isLoading) {
      console.log("AuthProvider: Check redirection", {
        isAuthenticated,
        pathname,
      });
      if (!isAuthenticated && !["/login", "/signup", "/"].includes(pathname)) {
        console.log("AuthProvider: Redirecting to /login...");
        router.replace("/");
      } else if (
        isAuthenticated &&
        (pathname === "/login" || pathname === "/signup")
      ) {
        console.log("AuthProvider: Redirecting to /feed...");
        router.replace("/feed");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show a premium loading screen while initializing to prevent content flash
  if (isLoading && pathname !== "/login" && pathname !== "/signup") {
    return (
      <div className="dt-signup-root !min-h-screen">
        <div className="dt-glow-br" />
        <div className="flex flex-col items-center gap-6 z-10 animate-in fade-in duration-700">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-2 border-r-2 border-red-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="dt-display text-2xl tracking-tight text-[#f0ede8]">
              Initializing <span className="dt-display-italic text-[#DC2626]">DevTinder</span>
            </h2>
            <p className="dt-mono text-[10px] text-white/30 uppercase tracking-[0.2em] animate-pulse">
              Curating your dev circle...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
