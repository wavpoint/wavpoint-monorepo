import { type TokensQueryArgs, ZDK, ZDKChain, ZDKNetwork } from "@zoralabs/zdk";
import { COLLECTION_ADDRESS, ZORA_API_ENDPOINT } from "./config";

const networkInfo = {
	network: ZDKNetwork.Zora,
	chain: ZDKChain.ZoraMainnet,
};

export const zdk = new ZDK({
	endpoint: ZORA_API_ENDPOINT,
	networks: [networkInfo],
});

export const fetchToken = async (id: string) => {
	const data = await zdk.token({
		token: {
			address: COLLECTION_ADDRESS,
			tokenId: id,
		},
		includeFullDetails: true,
	});

	return data.token?.token;
};

export const fetchTokens = async (ownerAddress?: `0x${string}`) => {
	const args: TokensQueryArgs = {
		where: {
			collectionAddresses: [COLLECTION_ADDRESS],
		},
	};

	if (ownerAddress) {
		args.where.ownerAddresses = [ownerAddress];
	}

	const data = await zdk.tokens(args);

	return data.tokens.nodes.map((node) => node.token);
};

export const fetchIsOwnerOfToken = async (
	ownerAddress: string,
	tokenId: string,
	collectionAddress: string = COLLECTION_ADDRESS,
) => {
	const data = await zdk.sdk.ownersByCount1155({
		where: {
			collectionAddress,
			tokenId,
		},
	});

	return !!data.aggregateStat.ownersByCount1155.filter(
		(token) => token.owner === ownerAddress,
	).length;
};
