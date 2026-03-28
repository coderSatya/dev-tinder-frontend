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
            <div className="flex h-[60vh] flex-col items-center justify-center gap-6 p-4">
                <div className="p-6 rounded-full bg-gray-50 border border-gray-100 shadow-inner">
                    <RefreshCw className="h-12 w-12 text-gray-300" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">No More Profiles</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        You've reached the end of the line! Check back later for more developers.
                    </p>
                </div>
                {/* Refresh needs to be a client component or a simple link */}
                <form action="">
                    <Button type="submit" variant="outline" className="rounded-full px-8">
                        Refresh Feed
                    </Button>
                </form>
            </div>
        );
    }

    return <FeedCarousel feed={feed} />;
}