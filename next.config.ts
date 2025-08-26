import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // Puedes comentar esto si prefieres que TS sí bloquee
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;

