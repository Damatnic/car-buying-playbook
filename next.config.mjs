/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'img2.carmax.com' },
      { protocol: 'https', hostname: '**.dealercarsearch.com' },
      { protocol: 'https', hostname: '**.dealerimages.com' },
      { protocol: 'https', hostname: '**.dealerinspire.com' },
      { protocol: 'https', hostname: '**.dealereprocess.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.akamaized.net' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
      { protocol: 'https', hostname: '**.s3.us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: '**.toyotaofbrookfield.com' },
      { protocol: 'https', hostname: '**.boucherauto.com' },
      { protocol: 'https', hostname: '**.bergstromauto.com' },
      { protocol: 'https', hostname: '**.heiserautomotive.com' }
    ]
  }
};
export default nextConfig;
