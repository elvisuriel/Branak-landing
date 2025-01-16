# Build stage
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Verificar contenido del directorio .next después del build
RUN ls -la .next/

# Production stage
FROM node:18-alpine

# Instalar nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copiar los archivos necesarios del builder
# Usamos rutas explícitas y verificamos cada copia
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Crear y configurar script de inicio
RUN echo "#!/bin/sh\nnginx\nnode server.js" > /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 81

CMD ["/app/start.sh"]