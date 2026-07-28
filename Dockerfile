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
# PORT can be overridden at deploy time (e.g. a Coolify env var) to match
# whatever "Ports Exposes" is set to on the host.
ENV PORT=5000

# Allow the non-root "node" user to bind privileged ports (<1024, e.g. 80),
# in case PORT is set to one of those, without running the container as root.
RUN apk add --no-cache libcap && \
    setcap 'cap_net_bind_service=+ep' "$(readlink -f "$(which node)")" && \
    apk del libcap

COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY --chown=node:node server ./server
COPY --chown=node:node shared ./shared
COPY --from=build --chown=node:node /app/dist/public ./dist/public

USER node

EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-5000}/api/health" || exit 1

CMD ["npm", "run", "start"]
