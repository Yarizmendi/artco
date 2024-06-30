/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: ( config ) => {
    config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: {
            loader: 'raw-loader'
        }
    });
    // config.plugins.push( config.ProvidePlugin({ p5: 'p5' }));
    return config
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
    ],
  },
}

const withMDX = require('@next/mdx')({
  options: {
    providerImportSource: '@mdx-js/react',
  }
})

module.exports = withMDX(nextConfig)