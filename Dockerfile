FROM node:22-alpine AS base
WORKDIR /app

# ---- dependencies for build (includes devDependencies) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- build client bundle (dist/public) ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- production-only dependencies ----
FROM base AS production-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- final runtime image ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY --chown=node:node server ./server
COPY --chown=node:node shared ./shared
COPY --from=build --chown=node:node /app/dist/public ./dist/public

USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-5000}/api/health" || exit 1

CMD ["npm", "run", "start"]
