/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: ( config ) => {
    config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: {
            loader: 'raw-loader'
        }
    });
    return config
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qfyy9q32bnwxmali.public.blob.vercel-storage.com',
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