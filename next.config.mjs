export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "hello-there",
            value: "d2hhdCBhcmUgeW91IGxvb2tpbmcgZm9yIGV4YWN0bHk/",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arian-next-blog-assets.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "docs.gethue.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.icon-icons.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.proxmox.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pointclouds.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.livoxtech.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "1000logos.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blog.brakmic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.wilddash.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "code.visualstudio.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
