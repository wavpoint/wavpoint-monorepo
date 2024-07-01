# Wavpoint Web App

This is the main web application for Wavpoint, a social platform for sharing onchain music.

## Key Features

- [Next.js](https://nextjs.org)-based web application
- Uses React Native components compiled to HTML and CSS via [Nativewind](https://nativewind.dev)
- Integrates with Supabase and Privy

## Environment Setup

Copy the `.env.example` file to `.env.local` and fill in the required variables:

```bash
cp .env.example .env.local
```

You'll need to set up:

1. A [Supabase](https://supabase.com/) project
2. A [Privy](https://privy.io) project
3. An RPC link (default or from [Alchemy](https://www.alchemy.com/))

Refer to the `.env.example` file for all required environment variables.

## Development

To run the web app:

```bash
bun dev --filter=@wavpoint/web --filter=@wavpoint/app
```

For more detailed instructions, refer to the [main README](../../README.md).