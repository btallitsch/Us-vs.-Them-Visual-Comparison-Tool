/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: false
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
