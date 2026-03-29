import { cookies } from "next/headers";
import { API_BASE_URL } from "@/constants/api.constants";
import { ConnectionRequestResponse } from "@/types/request.types";
import RequestList from "./RequestList";

async function getRequests(): Promise<ConnectionRequestResponse["data"]> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/user/requests/received`, {
      headers: {
        Cookie: `token=${token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return [];
    const json: ConnectionRequestResponse = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Fetch requests error:", err);
    return [];
  }
}

export default async function RequestPage() {
  const initialRequests = await getRequests();

  return (
    <div className="dt-root">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <RequestList initialRequests={initialRequests} />
      </div>
    </div>
  );
}
