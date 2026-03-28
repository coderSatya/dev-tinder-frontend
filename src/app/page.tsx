"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Feed from "@/components/Feed";

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  console.log(user, "user1111");

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-white">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {isAuthenticated && user ? (
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  Welcome back, <span className="text-red-500">{user.firstName}</span>
               </h1>
               <p className="text-gray-500 font-medium tracking-tight">Discover and connect with amazing developers.</p>
            </div>
            <Feed />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-center max-w-2xl w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tighter">
              Welcome to <span className="text-red-500">DevTinder</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto mb-10 font-medium">
              Find your coding flamemate. Swipe through developers, match with
              the best, and build amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/login"
                className="px-10 py-4 bg-red-500 text-white font-bold rounded-full shadow-xl hover:bg-red-600 transition-all hover:shadow-red-500/20 active:scale-95 text-lg"
              >
                Login Now
              </a>
              <a
                href="/signup"
                className="px-10 py-4 bg-gray-900 text-white font-bold rounded-full shadow-xl hover:bg-black transition-all active:scale-95 text-lg"
              >
                Join Community
              </a>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white border-t text-gray-400 text-center py-8 text-sm font-medium">
        <p>&copy; 2026 DevTinder. Built for Developers by Developers.</p>
      </footer>
    </div>
  );
}
