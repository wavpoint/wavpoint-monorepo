"use client";

import { View } from "@repo/app/ui";

import { SeasonCard, SeasonCardSkeleton } from "@repo/app/components";
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

	const { data, isLoading } = useQuery({
		queryKey: ["TOKENS"],
		queryFn: fetchTokens,
	});

	return (
		<View className="flex sm:flex-row flex-wrap items-center sm:justify-between max-w-md w-full mx-auto gap-2">
			{isLoading ? (
				<>
					{Array.from({ length: 6 }).map((_v, i) => (
						<SeasonCardSkeleton key={`skeleton_${i + 1}`} />
					))}
					<View className="loading hidden" />
				</>
			) : (
				data?.tokens.nodes.map((token) => (
					<SeasonCard token={token.token} key={token.token.tokenId} />
				))
			)}
		</View>
	);
}
