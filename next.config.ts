import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';


const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

const withMDX = createMDX({
    // customise the config file path
    // configPath: "source.config.ts"
});

export default withMDX(nextConfig);
