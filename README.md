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

## Deployment

Build the application for production:

```bash
pnpm build
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information on deployment options.
