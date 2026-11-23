import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/estudiante",
  reactCompiler: true,
  transpilePackages: ["@sena/auth"],
};

export default nextConfig;
