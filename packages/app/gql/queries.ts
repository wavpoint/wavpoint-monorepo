import { COLLECTION_ADDRESS } from "@wavpoint/utils";
import { client } from ".";
import { graphql as indexerGraphql } from "./indexer";

export const mintCountQueryDocument = indexerGraphql(/* GraphQL */ `
	query mintCountQuery($tokenId: String!) {
		mintCount(id: $tokenId) {
    		mintCount
  		}
	}
`);

export const fetchMintData = async (id: string) => {
	const res = await client.request(mintCountQueryDocument, {
		tokenId: `${id}:${COLLECTION_ADDRESS}`,
	});

	return res.mintCount?.mintCount;
};
