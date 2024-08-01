/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    KB_FOR_FILE: process.env.KB_FOR_FILE,
    KB_API_API: process.env.KB_API_API,
    KB_USER: process.env.KB_USER,
    KB_PASS: process.env.KB_PASS,
    KB_API_ORIGIN: process.env.KB_API_ORIGIN,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
