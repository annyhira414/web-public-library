/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["http://library-api.misfit-test.com/", "library-api.misfit-test.com", "localhost"],
  },
};

module.exports = nextConfig;
