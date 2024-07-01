# Wavpoint App Package

This package contains the core application logic and components used across the Wavpoint platform.

## Key Features

- Uses [Solito](https://solito.dev/) for cross-platform routing
  - Expo Router for mobile
  - Next.js navigation for web
- UI components based on [React Native Reusables](https://github.com/mrzachnugent/react-native-reusables)
- GraphQL integration with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- Data fetching with [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- Blockchain data fetching with [Zora's ZDK](https://zdk.zora.co/)
- Custom indexer for additional blockchain data

## Package Structure

- `/components`: Larger, composite components
- `/features`: Page and dialog components
- `/gql`: Generated TypeScript schemas and query functions
- `/hooks`: Custom utility hooks
- `/lib`: General utilities (ABIs, indexer functions, configs)
- `/provider`: Next.js/Expo layout provider
- `/store`: [Jotai](https://jotai.org/)-based state management
- `/ui`: UI primitives and style helper hooks

## Usage

This package is used internally by the Wavpoint web and mobile apps. Refer to their respective READMEs for usage instructions.

For more detailed instructions, refer to the [main README](../README.md).