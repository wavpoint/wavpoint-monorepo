import { COLLECTION_ADDRESS, ZORA_API_ENDPOINT } from "@wavpoint/utils";
import {
	type TokensQueryArgs,
	type TokensQueryInput,
	ZDK,
	ZDKChain,
	ZDKNetwork,
} from "@zoralabs/zdk";

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
