import { ZDK, ZDKChain, ZDKNetwork } from "@zoralabs/zdk";

const networkInfo = {
	network: ZDKNetwork.Zora,
	chain: ZDKChain.ZoraMainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
export const COLLECTION_ADDRESS = "0xcb11bcaedde64360dcbb0a72a15c4eef509b2f53";

export const zdk = new ZDK({
	endpoint: API_ENDPOINT,
	networks: [networkInfo],
});
