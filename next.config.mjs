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
      allowedOrigins: ["zany-garbanzo-7vw7p9jvx6w3xgvv.github.dev", "localhost:3000", "artco.netlify.app"],
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
        hostname: `https://artco.netlify.app`,
      }
    ],

  },
  // Add these headers for SharedArrayBuffer support
  async headers() {
    return [
        {
            source: '/(.*)',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: '*',
                },
                {
                    key: 'Cross-Origin-Embedder-Policy',
                    value: 'require-corp',
                },
                {
                    key: 'Cross-Origin-Opener-Policy',
                    value: 'same-origin',
                },
                {
                  key: "Cross-Origin-Resource-Policy",
                  value: "cross-origin",
                }
            ],
        },
    ];
},
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)