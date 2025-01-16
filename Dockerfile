# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Instalar nginx
RUN apk add --no-cache nginx

# Copiar archivos de la aplicación
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Script para iniciar tanto nginx como node
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 81
CMD ["./start.sh"]