"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import { Button, Row, Text, View } from "@repo/app/ui";

import { useQuery } from "@tanstack/react-query";
import { Copy, Edit3 } from "lucide-react-native";
import { useParams } from "solito/navigation";
import { formatAddress } from "../../lib/utils";
import { COLLECTION_ADDRESS, zdk } from "../../lib/zdk";
import { SeasonCard } from "../../ui/season-card";

const useProfileParams = useParams<{ id: string }>;

export function ProfileScreen() {
	const { id } = useProfileParams();

	const profileAddress = id.replace("/profile/", "");

	const fetchTokens = async () => {
		const tokens = await zdk.tokens({
			where: {
				collectionAddresses: [COLLECTION_ADDRESS],
				ownerAddresses: [profileAddress ?? ""],
			},
		});

		return tokens.tokens.nodes.map((node) => node.token);
	};

	const { data } = useQuery({
		queryKey: [`PROFILE_${profileAddress}`],
		queryFn: fetchTokens,
	});

	return (
		<DefaultLayout>
			<View className="max-w-xl flex-1 flex items-center w-full gap-8">
				<View className="items-center gap-2">
					<View className="w-20 h-20 rounded-full bg-gradient-final" />
					<Row className="items-center">
						<Text className="font-bold text-xl">Lootmatic</Text>
						<Edit3 className="w-4 h-4 ml-2 mt-1" />
					</Row>

					<Button variant={"link"} className="py-0 flex text-xs">
						{formatAddress(profileAddress)}
						<Copy className="w-3 h-3 ml-2 mt-1" />
					</Button>

					<Text className="text-xs font-semibold mt-1">Collected Seasons</Text>
				</View>

				<View className="flex w-full gap-2 flex-row flex-wrap justify-evenly">
					{data?.map((token) => (
						<SeasonCard token={token} key={token.tokenId} />
					))}
				</View>
			</View>
		</DefaultLayout>
	);
}
