const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
  
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/error',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;