// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["i.pravatar.cc", "randomuser.me"],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pravatar.cc", "randomuser.me"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7777/:path*",
      },
    ];
  },
};
export default nextConfig;
