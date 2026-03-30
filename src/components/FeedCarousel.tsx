"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import { RefreshCw } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import UserCard from "@/components/UserCard";
import { FeedUser } from "@/types/feed.types";
import { useAuthStore } from "@/store/useAuthStore";

interface FeedCarouselProps {
    feed: FeedUser[]; // replace with your actual User type
}

export default function FeedCarousel({ feed: initialFeed }: FeedCarouselProps) {
    const globalFeed = useAuthStore((state) => state.feed?.data);
    const displayFeed = globalFeed || initialFeed;

    if (!displayFeed || displayFeed.length === 0) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-8 p-4 text-center animate-in fade-in zoom-in duration-700">
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
                    onClick={() => window.location.reload()}
                    className="dt-btn-outline px-10 py-3 text-sm border-white/10 hover:border-red-500/50 hover:text-red-500"
                >
                    Refresh Discovery
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto py-8 px-4 flex justify-center items-center">
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Navigation]}
                className="mySwiper w-full max-w-md h-full"
            >
                {displayFeed?.map((user) => (
                    <SwiperSlide key={user._id}>
                        <UserCard user={user} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}