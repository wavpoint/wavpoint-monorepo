"use client";

import { SeasonCard, View } from "@repo/app/ui";

import { zdk } from "@repo/app/lib";
import { COLLECTION_ADDRESS } from "@repo/utils";
import { useQuery } from "@tanstack/react-query";

export function HomeScreen() {
	const fetchTokens = async () => {
		const data = await zdk.tokens({
			where: {
				collectionAddresses: [COLLECTION_ADDRESS],
			},
		});

		return data;
	};

	const { data } = useQuery({
		queryKey: ["TOKENS"],
		queryFn: fetchTokens,
	});

	return (
		<View className="flex sm:flex-row flex-wrap items-center sm:justify-between max-w-md w-full mx-auto gap-2">
			{data?.tokens.nodes.map((token) => (
				<SeasonCard token={token.token} key={token.token.tokenId} />
			))}
		</View>
	);
}
