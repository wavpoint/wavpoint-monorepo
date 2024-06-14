import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_INDEXER_URI ?? "http://localhost:42069",
	documents: ["**/*.tsx", "**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./gql/": {
			preset: "client",
		},
	},
};

export default config;
