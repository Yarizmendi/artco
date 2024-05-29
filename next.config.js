/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    })
    return config
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'media.mymind.host'
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      }
    ],
  },
}

const withMDX = require('@next/mdx')({
  options: {
    providerImportSource: '@mdx-js/react',
  }
})

module.exports = withMDX(nextConfig)