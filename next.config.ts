import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile three.js ecosystem packages (required for Next.js App Router SSR compat)
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Next.js 16 uses Turbopack by default
  turbopack: {},
};

export default nextConfig;
