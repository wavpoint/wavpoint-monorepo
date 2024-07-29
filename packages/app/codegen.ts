import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	documents: ["**/*.tsx", "**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./gql/indexer/": {
			schema: "https://indexer.wavpoint.tech",
			preset: "client",
		},
		// "./gql/zora/": {
		// 	schema: "https://api.zora.co/graphql",
		// 	preset: "client",
		// },
	},
};

export default config;
