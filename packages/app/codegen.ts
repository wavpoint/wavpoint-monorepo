import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema:
		process.env.NODE_ENV === "development"
			? "http://localhost:42069"
			: process.env.INDEXER_URI,
	documents: ["**/*.tsx", "**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./gql/": {
			preset: "client",
		},
	},
};

export default config;
