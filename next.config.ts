import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuration pour Netlify
  output: 'standalone',

  // Optimisations d'images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Transpiler les packages nécessaires
  transpilePackages: ['@shadergradient/react', 'three-stdlib'],

  // Configuration expérimentale pour les bundles
  experimental: {
    optimizePackageImports: ['@shadergradient/react', '@react-three/fiber'],
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;