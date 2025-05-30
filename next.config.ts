/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {}, // empty object disables Turbopack enhancements
    },
  },
};

export default nextConfig;
