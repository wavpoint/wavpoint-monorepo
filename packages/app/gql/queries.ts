import { COLLECTION_ADDRESS } from "@wavpoint/utils";
import { client } from ".";
import { graphql as indexerGraphql } from "./indexer";

export const tokensQueryDocument = indexerGraphql(/* GraphQL */ `
	query tokens {
		tokens {
			items {
			tokenId
			imageUrl
			name
			mintCount
			}
		}
	}
`);

export const tokenQueryDocument = indexerGraphql(/* GraphQL */ `
	query token($tokenId: String!) {
		token(id: $tokenId) {
			contentUrl
			imageUrl
			medium
			name
			mintCount
			notes
		}
	}
`);

export const tokenNameQueryDocument = indexerGraphql(/* GraphQL */ `
	query tokenName($tokenId: String!) {
		token(id: $tokenId) {
			name
		}
	}
`);

export const tokenMintCountQueryDocument = indexerGraphql(/* GraphQL */ `
	query tokenMintCount($tokenId: String!) {
		token(id: $tokenId) {
    		mintCount
  		}
	}
`);

export const userTokensQueryDocument = indexerGraphql(/* GraphQL */ `
	query userTokens($user: String!) {
		user(id: $user) {
			userTokens {
			items {
				token {
				name
				tokenId
				imageUrl
				mintCount
				}
			}
			}
		}
	}
`);

export const userOwnsTokenQueryDocument = indexerGraphql(/* GraphQL */ `
	query userOwnsToken($user: String!, $token: String!) {
		ownedTokens(where: {AND: {user: $user, token: $token}}) {
			items {
			amountOwned
			}
		}
	}
`);

export const fetchUserTokens = async (user: string) => {
	const res = await client.request(userTokensQueryDocument, {
		user: user.toLowerCase(),
	});

	return res.user?.userTokens?.items.map((item) => item.token);
};

export const fetchUserOwnsToken = async (
	user: string,
	id: string,
	address: string,
) => {
	const res = await client.request(userOwnsTokenQueryDocument, {
		user: user.toLowerCase(),
		token: `${id}:${address.toLowerCase()}`,
	});

	return res.ownedTokens.items.length > 0;
};

export const fetchTokens = async () => {
	const res = await client.request(tokensQueryDocument);

	return res.tokens.items;
};

export const fetchToken = async (id: string) => {
	const res = await client.request(tokenQueryDocument, {
		tokenId: `${id}:${COLLECTION_ADDRESS}`,
	});

	return res.token;
};

export const fetchTokenName = async (id: string) => {
	const res = await client.request(tokenNameQueryDocument, {
		tokenId: `${id}:${COLLECTION_ADDRESS}`,
	});

	return res.token;
};

export const fetchMintData = async (id: string) => {
	const res = await client.request(tokenMintCountQueryDocument, {
		tokenId: `${id}:${COLLECTION_ADDRESS}`,
	});

	return res.token;
};
