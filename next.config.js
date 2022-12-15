/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', "i.ytimg.com", "yt3.ggpht.com"]
  },
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;