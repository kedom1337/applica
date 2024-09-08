# Base image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Stage 1 - Build app
FROM base AS build

# Install dependencies
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# Build application
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Stage 2 - Run app
FROM base AS final
WORKDIR /app

# Use non-privileged user
USER bun

# Copy the build artifacts from the build stage
COPY --from=build /usr/src/app/.output .

# Run the application
EXPOSE 3000/tcp
ENV NUXT_HOST=0.0.0.0
ENTRYPOINT ["bun", "run", "./server/index.mjs", "--host", "$NUXT_HOST"]
