"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Flame, LogOut, User, ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logoutUser } from "@/api/profile.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log("Closing dropdown due to outside click");
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-red-500 p-1.5 rounded-lg shadow-lg shadow-red-200">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
            DevTinder
          </span>
        </Link>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-6 animate-in fade-in duration-500">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Online</span>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                id="user-dropdown-btn"
                onClick={() => {
                  console.log("Dropdown button clicked, prev state:", isDropdownOpen);
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
              >
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName}'s profile`}
                    className="h-9 w-9 rounded-full object-cover border-2 border-white ring-2 ring-red-500 shadow-md group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white font-bold border-2 border-white ring-2 ring-red-500 shadow-md group-hover:scale-105 transition-transform">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col items-start ml-1">
                  <span className="text-sm font-bold text-gray-800 leading-none">
                    {user.firstName}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-gray-100 shadow-2xl py-2 animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-hidden">
                  <div className="px-4 py-3 mb-1 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.emailId}</p>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Your Profile</span>
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Settings</span>
                  </Link>
                  
                  <div className="h-px bg-gray-50 my-1" />
                  
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                  >
                    <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
