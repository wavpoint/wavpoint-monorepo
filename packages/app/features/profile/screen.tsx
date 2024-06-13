"use client";

import { Button, Row, SeasonCard, Text, View } from "@repo/app/ui";

import { cookieName, getSupabase, zdk } from "@repo/app/lib";
import { COLLECTION_ADDRESS, formatAddress } from "@repo/utils";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Copy, Edit3 } from "lucide-react-native";
import { useMemo } from "react";
import { useParams } from "solito/navigation";

const useProfileParams = useParams<{ id: string }>;

export function ProfileScreen() {
	const { id } = useProfileParams();

	const profileAddress = id.replace("/profile/", "");

	const supabase = useMemo(() => {
		const accessToken = Cookies.get(cookieName);
		return getSupabase(accessToken ?? "");
	}, []);

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			if (!supabase) return;
			return supabase
				.from("User")
				.select("*")
				.eq("id", profileAddress)
				.single<{ username: string; image: string }>();
		},
		enabled: !!supabase && !!profileAddress,
	});

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
		<View className="max-w-xl flex-1 flex items-center w-full gap-8">
			<View className="items-center gap-2">
				<View className="w-20 h-20 rounded-full bg-gradient-final" />
				<Row className="items-center">
					<Text className="font-bold text-xl">{user?.data?.username}</Text>
					<Edit3 className="w-4 h-4 ml-2 mt-1" />
				</Row>

				<Button variant={"link"} className="py-0 flex text-xs">
					{formatAddress(profileAddress)}
					<Copy className="w-3 h-3 ml-2 mt-1" />
				</Button>

				<Text className="text-xs font-semibold mt-1">Collected Seasons</Text>
			</View>

			<View className="flex sm:flex-row flex-wrap items-center sm:justify-between max-w-md w-full mx-auto gap-2">
				{data?.map((token) => (
					<SeasonCard token={token} key={token.tokenId} />
				))}
			</View>
		</View>
	);
}
