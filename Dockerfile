FROM node:18-alpine AS builder
WORKDIR /main
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /main

# Removimos la copia de next.config.js ya que no es necesaria
COPY --from=builder /main/public ./public
COPY --from=builder /main/.next/standalone ./
COPY --from=builder /main/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]