# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app
# helpful for native deps (sharp, etc.)
RUN apk add --no-cache libc6-compat
# enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9 --activate
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- Deps (install node_modules with caching) ----------
FROM base AS deps
# Copy only files needed to resolve deps to maximize Docker layer cache
COPY package.json pnpm-lock.yaml* .npmrc* ./
# Default behavior:
# - If pnpm-lock.yaml exists -> use frozen
# - If it doesn't exist      -> do a non-frozen install once
# You can override with: --build-arg FROZEN=true/false
ARG FROZEN=auto
RUN sh -c '\
  if [ "$FROZEN" = "true" ]; then \
    echo "Using frozen lockfile"; pnpm install --frozen-lockfile; \
  elif [ "$FROZEN" = "false" ]; then \
    echo "Using non-frozen install"; pnpm install; \
  else \
    if [ -f pnpm-lock.yaml ]; then \
      echo "Lockfile found -> frozen install"; pnpm install --frozen-lockfile; \
    else \
      echo "No lockfile -> non-frozen install"; pnpm install; \
    fi; \
  fi'

# ---------- Builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If you use Next standalone output, uncomment in next.config.js: output: 'standalone'
RUN pnpm build

# ---------- Runner (prod image) ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# If you use standalone output:
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

# If you are NOT using standalone, copy node_modules + .next + public instead:
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]