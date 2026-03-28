"use client";

import { useFeed } from "@/hooks/useFeed";
import UserCard from "./UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export default function Feed() {
  const { feed, isLoading, isError, sendRequest, refetch } = useFeed();

  console.log(feed, "feedddddd");

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
        <p className="text-gray-500 font-bold tracking-widest uppercase text-xs animate-pulse">
          Finding your matches...
        </p>
      </div>
    );
  }

  if (isError || !feed || feed.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-6 p-4">
        <div className="p-6 rounded-full bg-gray-50 border border-gray-100 shadow-inner">
          <RefreshCw className="h-12 w-12 text-gray-300" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">No More Profiles</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            You've reached the end of the line! Check back later for more
            developers.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-full px-8"
        >
          Refresh Feed
        </Button>
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
        {feed.map((user) => (
          <SwiperSlide key={user._id}>
            <UserCard
              user={user}
              // onInterested={() =>
              //   sendRequest({ status: "interested", userId: user._id })
              // }
              // onRejected={() =>
              //   sendRequest({ status: "ignored", userId: user._id })
              // }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
