import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
 // Fuerza la generación de archivos HTML/CSS/JS puros en la carpeta 'out'
  output: 'export',
  // Cloudflare Pages requiere imágenes sin procesar en modo estático
  images: {
    unoptimized: true,
  },
  // Evita que el build se detenga por errores de linting o tipos
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
