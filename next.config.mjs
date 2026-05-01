/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'img2.carmax.com' },
      { protocol: 'https', hostname: 'imgs.search.brave.com' }
    ]
  }
};
export default nextConfig;
