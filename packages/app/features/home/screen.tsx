"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import { View } from "@repo/app/ui";

import { useQuery } from "@tanstack/react-query";
import { COLLECTION_ADDRESS, zdk } from "../../lib/zdk";
import { SeasonCard } from "../../ui/season-card";

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
		<DefaultLayout>
			<View className="flex-1 flex max-w-xl w-full gap-2 flex-row flex-wrap justify-evenly">
				{data?.tokens.nodes.map((token) => (
					<SeasonCard token={token.token} key={token.token.tokenId} />
				))}
			</View>
		</DefaultLayout>
	);
}
