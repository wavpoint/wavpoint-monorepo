import { createConfig, mergeAbis } from "@ponder/core";
import { http } from "viem";

import { Zora1155Abi } from "./abis/Zora1155Abi";
import { ZoraCreator1155Impl_0xa1f4Abi } from "./abis/ZoraCreator1155Impl_0xa1f4Abi";

export default createConfig({
	networks: {
		zora: {
			chainId: 7777777,
			transport: http(process.env.PONDER_RPC_URL_7777777),
		},
	},
	contracts: {
		ZoraCreator1155Impl: {
			abi: mergeAbis([Zora1155Abi, ZoraCreator1155Impl_0xa1f4Abi]),
			address: "0xcb11bcaedde64360dcbb0a72a15c4eef509b2f53",
			network: "zora",
		},
	},
});
