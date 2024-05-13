"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import { View } from "@repo/app/ui";

import { ZDKChain, ZDKNetwork } from "@zoralabs/zdk";
import { useEffect, useState } from "react";
import { type TokenData, zdk } from "../../lib/zdk";
import { SeasonCard } from "../../ui/season-card";

export function HomeScreen() {
	const [tokensData, setTokensData] = useState<TokenData[]>([]);
	const [fetched, setFetched] = useState(false);

	const fetchData = async () => {
		const tokens = await zdk.tokens({
			where: {
				collectionAddresses: ["0xcb11bcaedde64360dcbb0a72a15c4eef509b2f53"],
			},
			includeFullDetails: true,
			includeSalesHistory: false,
			networks: [
				{
					chain: ZDKChain.ZoraMainnet,
					network: ZDKNetwork.Zora,
				},
			],
		});

		setTokensData(tokens.tokens.nodes.map((node) => node.token));

		setFetched(true);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!fetched) fetchData();
	}, [fetched]);

	return (
		<DefaultLayout>
			<View className="flex-1 flex max-w-xl w-full gap-2 flex-row flex-wrap justify-evenly">
				{tokensData.map((token) => (
					<SeasonCard token={token} key={token.tokenId} />
				))}
			</View>
		</DefaultLayout>
	);
}
