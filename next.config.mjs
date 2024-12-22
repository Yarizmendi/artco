/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'

const nextConfig = {
  webpack: ( config, {webpack} ) => {

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^vertx/,
        '@vertx/core'
  ));
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
  crossOrigin: 'anonymous'
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)