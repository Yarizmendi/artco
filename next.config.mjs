/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

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

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  experimental: {
    serverActions: {
      allowedOrigins: ["zany-garbanzo-7vw7p9jvx6w3xgvv.github.dev", "localhost:3000"],
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qfyy9q32bnwxmali.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: `https://static.wixstatic.com`
      }
    ],

  },

}

const withMDX = createMDX({
// providerImportSource: '@mdx-js/react',
})

export default withMDX(nextConfig)