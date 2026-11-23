import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/administrador",
  reactCompiler: true,
  transpilePackages: ["@sena/auth", "@sena/programador"],
};

export default nextConfig;
