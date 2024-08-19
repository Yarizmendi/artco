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
    serverActions: {
      allowedOrigins: ["zany-garbanzo-7vw7p9jvx6w3xgvv.github.dev", "localhost:3000"],
      // allowedForwardedHosts: ["localhost:3000"],
      // ^ You might have to use this property depending on your exact version.
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

const withMDX = require('@next/mdx')({
  options: {
    providerImportSource: '@mdx-js/react',
  }
})

module.exports = withMDX(nextConfig)