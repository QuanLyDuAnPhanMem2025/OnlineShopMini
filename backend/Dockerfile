# Multi-stage build for Express.js backend
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Development image with all dependencies
FROM base AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy production dependencies
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./

# Copy application source
COPY --from=dev --chown=nodejs:nodejs /app/src ./src

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "src/index.js"]
