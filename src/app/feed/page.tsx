export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedCarousel from "@/components/FeedCarousel";


async function getFeed() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value; // adjust to your auth mechanism

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/feed`, {
        headers: {
            Cookie: `token=${token}`, // pass auth cookie to your API
        },
        cache: "no-store", // always fresh — like useFeed would behave
    });

    if (!res?.ok) return null;
    return res?.json();
}

export default async function Feed() {
    const feedResponse = await getFeed();
    const feed = feedResponse?.data;

    if (!feed || feed?.length === 0) {
        return (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-8 p-4 text-center">
                <div className="p-8 rounded-full bg-white/5 border border-white/10 shadow-2xl relative">
                    <RefreshCw className="h-14 w-14 text-white/20 animate-spin-slow" />
                    <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full" />
                </div>
                <div className="space-y-3 max-w-sm">
                    <h3 className="dt-display text-4xl text-[#f0ede8]">
                        End of the <span className="dt-display-italic text-[#DC2626]">Line</span>
                    </h3>
                    <p className="text-white/40 font-medium leading-relaxed">
                        You've explored all currently active developers. Check back soon for fresh talent!
                    </p>
                </div>
                <form action="">
                    <button type="submit" className="dt-btn-outline px-10 py-3 text-sm border-white/10 hover:border-red-500/50 hover:text-red-500">
                        Refresh Discovery
                    </button>
                </form>
            </div>
        );
    }

    return <FeedCarousel feed={feed} />;
}