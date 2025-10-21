/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ hostname: "vaspar.storage.iran.liara.space", protocol: "https" }],
  },
};

module.exports = nextConfig;