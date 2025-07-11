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
        hostname: "www.elegantshowers.co.uk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.boyersfurniture.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "darlingdarleen.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ashleyfurniture.scene7.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coshliving.com.au",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
