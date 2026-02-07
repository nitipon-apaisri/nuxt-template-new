# Multi-stage build for Nuxt 3 application

# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy project files (including .env.prod and .env.dev)
COPY . .

# Set ARG for environment selection with default value
ARG ENVIRONMENT=production
ENV NODE_ENV=$ENVIRONMENT

# TAG VERSION
ARG TAG_VERSION
ENV TAG_VERSION=${TAG_VERSION}

ARG VERSION=latest
ENV NUXT_VERSION=$VERSION
LABEL version=$VERSION

RUN echo "Building for environment: $NODE_ENV"

# Validate environment and copy appropriate .env file
# Then append version information with proper newlines
RUN case "$NODE_ENV" in \
      "production"|"prod") \
        if [ ! -f .env.prod ]; then \
          echo "Error: .env.prod file not found" && exit 1; \
        fi && \
        cp .env.prod .env && \
        echo "" >> .env && \
        echo "TAG_VERSION=${TAG_VERSION:-}" >> .env && \
        echo "NUXT_VERSION=${VERSION:-latest}" >> .env ;; \
      "development"|"dev") \
        if [ ! -f .env.dev ]; then \
          echo "Error: .env.dev file not found" && exit 1; \
        fi && \
        cp .env.dev .env && \
        echo "" >> .env && \
        echo "TAG_VERSION=${TAG_VERSION:-}" >> .env && \
        echo "NUXT_VERSION=${VERSION:-latest}" >> .env ;; \
      *) echo "Invalid environment: $NODE_ENV" && exit 1 ;; \
    esac

# Build the application
RUN pnpm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

ARG ENVIRONMENT=production
ENV NODE_ENV=$ENVIRONMENT

# TAG VERSION (for runtime access)
ARG TAG_VERSION
ENV TAG_VERSION=${TAG_VERSION}

ARG VERSION=latest
ENV NUXT_VERSION=$VERSION
LABEL version=$VERSION

# Copy only necessary files from build stage
COPY --from=build /app/.output ./.output
COPY --from=build /app/.env ./.env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", ".output/server/index.mjs"]