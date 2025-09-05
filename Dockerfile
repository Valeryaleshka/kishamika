# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root configuration files
COPY package.json yarn.lock ./

# Copy app-specific files
COPY apps/kishamika-be/ ./apps/kishamika-be/
COPY apps/kishamika-fe/ ./apps/kishamika-fe/
# Install dependencies
RUN yarn install --frozen-lockfile

# Build both applications using Nx
RUN yarn build:prod

# Production stage for Backend
FROM node:22-alpine AS backend-production

WORKDIR /app

# Install production dependencies only
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy built backend
COPY --from=builder /app/apps/kishamika-be/dist ./be/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

CMD ["node", "be/dist/main.js"]

# Production stage for Frontend
FROM nginx:alpine AS frontend-production

# Copy built frontend
COPY --from=builder /app/apps/kishamika-fe/dist/kika-project /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Copy nginx configuration
COPY apps/kishamika-fe/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
