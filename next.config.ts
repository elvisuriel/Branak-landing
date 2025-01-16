import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Permite cargar imágenes desde este dominio
  },
  output: "export", // Generar contenido estático
};

export default nextConfig;