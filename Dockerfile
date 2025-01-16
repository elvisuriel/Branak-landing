FROM node:18-alpine AS builder
WORKDIR /main
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /main

# Copiar archivos necesarios
COPY --from=builder /main/next.config.js ./
COPY --from=builder /main/public ./public
COPY --from=builder /main/.next/standalone ./
COPY --from=builder /main/.next/static ./.next/static

# Exponer puerto 3000 (puerto por defecto de Next.js)
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "server.js"]