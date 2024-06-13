import { ZORA_API_ENDPOINT } from "@repo/utils";
import { ZDK, ZDKChain, ZDKNetwork } from "@zoralabs/zdk";

const networkInfo = {
	network: ZDKNetwork.Zora,
	chain: ZDKChain.ZoraMainnet,
};

export const zdk = new ZDK({
	endpoint: ZORA_API_ENDPOINT,
	networks: [networkInfo],
});
