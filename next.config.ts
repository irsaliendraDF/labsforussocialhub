import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Templates now live inside the pillar they serve.
      { source: "/templates", destination: "/pillars", permanent: false },
    ];
  },
};

export default nextConfig;
