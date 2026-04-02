export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE_VIEW: "/profile/view",
  LOGOUT: "/logout",
  FEED: "/user/feed",
  REQUEST_SEND: "/request/send",
  CONNECTION: "/user/connection",
} as const;
