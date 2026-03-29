export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7777";

export const ENDPOINTS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE_VIEW: "/profile/view",
  LOGOUT: "/logout",
  FEED: "/user/feed",
  REQUEST_SEND: "/request/send",
  CONNECTION: "/user/connection",
} as const;
