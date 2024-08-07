"use client";

import { View } from "@wavpoint/app/ui";

import { useQuery } from "@tanstack/react-query";
import { SeasonCard, SeasonCardSkeleton } from "@wavpoint/app/components";
import { fetchTokens } from "@wavpoint/app/gql";
import { cn } from "../../lib";

export function HomeScreen() {
	const { data, isLoading } = useQuery({
		queryKey: ["TOKENS"],
		queryFn: () => fetchTokens(),
	});

	return (
		<View
			className={cn(
				"flex sm:flex-row flex-wrap items-center sm:justify-between max-w-md w-full mx-auto gap-2",
				data?.length === 1 && "justify-center sm:justify-center",
			)}
		>
			{isLoading ? (
				<>
					{Array.from({ length: 6 }).map((_v, i) => (
						<SeasonCardSkeleton key={`skeleton_${i + 1}`} />
					))}
					<View className="loading hidden" />
				</>
			) : (
				data?.map((token) => <SeasonCard token={token} key={token.tokenId} />)
			)}
		</View>
	);
}
