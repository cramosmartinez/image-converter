// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public', // Directorio donde se almacenarán los archivos PWA (manifest, service-worker)
  register: true, // Registra el Service Worker automáticamente
  skipWaiting: true, // Fuerza la actualización del Service Worker
  disable: process.env.NODE_ENV === 'development', // Deshabilita PWA en desarrollo para evitar caché molesta
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí puedes añadir otras configuraciones de Next.js si las necesitas
};

module.exports = withPWA(nextConfig);
