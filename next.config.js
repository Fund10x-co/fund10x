/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: "https://fund10x-app-kx5rv4za5a-uc.a.run.app/",
  },
  images: {
    // domains: ["picsum.photos"],
    // remotePatterns: ["picsum.photos"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
