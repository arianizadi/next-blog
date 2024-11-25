export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'hello-there',
            value: 'd2hhdCBhcmUgeW91IGxvb2tpbmcgZm9yIGV4YWN0bHk/',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ]
  },
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arian-next-blog-assets.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}