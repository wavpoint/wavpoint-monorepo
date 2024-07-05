<p align="center">
  <img src="https://app.wavpoint.tech/logo.png" alt="Wavpoint Logo" width="200"/>
</p>

# Wavpoint Monorepo

Wavpoint is an onchain platform, purpose-built, to showcase heavily curated and tokenized music minimixes. This monorepo houses the web app and future mobile app for the Wavpoint platform.

↳Deploy unreleased/rare music in mix form.
↳Test resonance.
↳Archive to limited-edition vinyl if the mix performs well.

## Repository Structure

```
wavpoint/
├── apps/
│   ├── landing/    # Vite-based HTML landing page with Tailwind
│   ├── web/        # Next.js web application
│   └── mobile/     # Expo mobile application
├── packages/
│   ├── app/        # Solito router-based cross-platform package
│   ├── utils/      # Constant variables and common schemas/utils
│   └── typescript-config/
```

## Package and App READMEs

- Apps
  - [Landing Page](apps/landing/README.md)
  - [Web App](apps/web/README.md)
  - [Mobile App](apps/mobile/README.md)
- Packages
  - [App Package](packages/app/README.md)
  - [Utils Package](packages/utils/README.md)
  - [TypeScript Config](packages/typescript-config/README.md)

## Key Technologies

- [Turborepo](https://turbo.build/repo) for monorepo management
- [TypeScript](https://www.typescriptlang.org/)
- [Viem](https://viem.sh/) for blockchain interactions
- [Next.js](https://nextjs.org/) for web app
- [Expo](https://expo.dev/) for mobile app
- [Solito](https://solito.dev/) for cross-platform routing
- [NativeWind](https://www.nativewind.dev/) for styling
- [Zora](https://docs.zora.co/) for blockchain integration
- [Jotai](https://jotai.org) for state management
- [Privy](https://privy.io) for authentication
- [Supabase](https://supabase.com) for data storage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/) package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/wavpoint/wavpoint-monorepo.git
   cd wavpoint-monorepo
   ```

2. Install dependencies:
   ```
   bun install
   ```

### Development

To start a development build for all projects:

```
bun dev
```

To run a specific project:

```
bun dev --filter=@wavpoint/<workspace>
```

Replace `<workspace>` with `landing`, `web`, or `mobile` to run the respective project.

### Building

To create a production build:

```
bun run build
```

### Cleaning

To remove build files and `node_modules` across the codebase:

```
bun clean
```

## Deployment

This project is deployed using Vercel. The `main` branch is automatically deployed to production, while feature branches create preview deployments.

---

For any questions or issues, please open an issue in the GitHub repository.
