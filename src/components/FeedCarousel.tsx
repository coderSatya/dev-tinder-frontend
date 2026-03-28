"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import UserCard from "@/components/UserCard";
import { FeedUser } from "@/types/feed.types";

interface FeedCarouselProps {
    feed: FeedUser[]; // replace with your actual User type
}

export default function FeedCarousel({ feed }: FeedCarouselProps) {
    return (
        <div className="w-full max-w-lg mx-auto py-8 px-4 flex justify-center items-center">
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Navigation]}
                className="mySwiper w-full max-w-md h-full"
            >
                {feed?.map((user) => (
                    <SwiperSlide key={user._id}>
                        <UserCard user={user} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}