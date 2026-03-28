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
      if (!isAuthenticated && pathname !== "/login" && pathname !== "/signup") {
        console.log("AuthProvider: Redirecting to /login...");
        router.replace("/login");
      } else if (
        isAuthenticated &&
        (pathname === "/login" || pathname === "/signup")
      ) {
        console.log("AuthProvider: Redirecting to /...");
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show a loading screen while initializing to prevent content flash
  // if (isLoading && pathname !== "/login" && pathname !== "/signup") {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center bg-white">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
  //         <p className="text-gray-500 font-bold animate-pulse tracking-widest uppercase text-xs">Initializing DevTinder</p>
  //       </div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
