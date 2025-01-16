# Etapa 1: Construcción de la aplicación
FROM node:20.12.2-alpine AS builder
WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar el código fuente
COPY . .

# Exportar la aplicación como estática
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:stable-alpine
COPY --from=builder /app/out /usr/share/nginx/html

# Exponer el puerto para NGINX
EXPOSE 81

# Comando por defecto para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
