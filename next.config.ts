// next.config.js

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '');

const nextConfig = {
  images: {
    domains: [hostname], // e.g. xnxfyqqjrtjbjwceozbj.supabase.co
  },
};

module.exports = nextConfig;
