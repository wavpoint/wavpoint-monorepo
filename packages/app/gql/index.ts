import { GraphQLClient } from "graphql-request";

export * from "./queries";

export const client = new GraphQLClient(
	process.env.NEXT_PUBLIC_INDEXER_URI ?? "http://localhost:42069",
);
