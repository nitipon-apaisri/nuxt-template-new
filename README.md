# COSMIC CRM

A modern Customer Relationship Management application built with Nuxt 4 and Nuxt UI.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - Vue 3 meta-framework
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/) - Tailwind CSS component library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Vue state management
- **Authentication**: [Nuxt Auth](https://auth.sidebase.io/) with Keycloak integration
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/) - Vue I18n integration for Nuxt
- **Icons**: [Iconify](https://iconify.design/) with Lucide and Simple Icons
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Utilities**: [Day.js](https://day.js.org/)
- **Package Manager**: pnpm

## Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (install with `npm install -g pnpm`)

## Getting Started

1. **Install dependencies**:

```bash
pnpm install
```

2. **Start the development server**:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm format` | Format code with Prettier |

## Project Structure

```
cosmic-crm/
├── app/              # Nuxt app directory (pages, components, layouts)
├── server/           # Server-side code (API routes, middleware)
├── public/           # Static assets
└── nuxt.config.ts    # Nuxt configuration
```

## Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting

Run `pnpm typecheck` before committing to ensure type safety.

## Docker Deployment

The project includes a multi-stage Dockerfile for containerized deployment.

### Prerequisites

- Docker (v20 or higher recommended)
- Docker Compose (optional, for orchestration)

### Building the Docker Image

The Dockerfile supports both production and development builds through the `ENVIRONMENT` build argument.

**Production build** (default):

```bash
docker build -t cosmic-crm:latest .
```

**Development build**:

```bash
docker build --build-arg ENVIRONMENT=development -t cosmic-crm:dev .
```

**Build with version tag**:

```bash
docker build \
  --build-arg VERSION=1.0.0 \
  --build-arg TAG_VERSION=v1.0.0 \
  -t cosmic-crm:1.0.0 .
```

### Build Arguments

| Argument | Default | Description |
|----------|---------|-------------|
| `ENVIRONMENT` | `production` | Target environment (`production` or `development`) |
| `VERSION` | `latest` | Application version label |
| `TAG_VERSION` | - | Git tag or version identifier |

### Environment Files

The Dockerfile automatically copies the appropriate environment file based on the `ENVIRONMENT` argument:
- **Production**: Uses `.env.prod`
- **Development**: Uses `.env.dev`

Ensure the required `.env.prod` or `.env.dev` file exists in the project root before building.

### Running the Container

**Run production container**:

```bash
docker run -p 3000:3000 cosmic-crm:latest
```

**Run with custom environment variables**:

```bash
docker run -p 3000:3000 \
  -e NUXT_PUBLIC_API_URL=https://api.example.com \
  cosmic-crm:latest
```

**Run in detached mode**:

```bash
docker run -d -p 3000:3000 --name cosmic-crm cosmic-crm:latest
```

### Docker Compose Example

Create a `docker-compose.yml` file:

```yaml
services:
  cosmic-crm:
    build:
      context: .
      args:
        ENVIRONMENT: production
        VERSION: ${VERSION:-latest}
        TAG_VERSION: ${TAG_VERSION:-}
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_URL=${API_URL}
    restart: unless-stopped
```

Then run with:

```bash
docker-compose up -d
```

## Traditional Deployment

Build the application for production without Docker:

```bash
pnpm build
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information on deployment options.
