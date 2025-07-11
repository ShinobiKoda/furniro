// next.config.js

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;
