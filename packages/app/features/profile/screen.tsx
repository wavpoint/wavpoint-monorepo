"use client";

import { Button, Row, Text, View } from "@repo/app/ui";

import { usePrivy } from "@privy-io/react-auth";
import {
	Avatar,
	EditProfileForm,
	SeasonCard,
	SeasonCardSkeleton,
} from "@repo/app/components";
import { cookieName, getSupabase, zdk } from "@repo/app/lib";
import { COLLECTION_ADDRESS, formatAddress } from "@repo/utils";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Check, Copy, Edit3 } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useParams } from "solito/navigation";

const useProfileParams = useParams<{ id: string }>;

export function ProfileScreen() {
	const { id } = useProfileParams();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);

	const profileAddress = id.replace("/profile/", "");

	const { user } = usePrivy();

	const handleCopy = () => {
		navigator.clipboard.writeText(id);
		setCopied(true);

		setTimeout(() => setCopied(false), 2000);
	};

	const supabase = useMemo(() => {
		const accessToken = Cookies.get(cookieName);
		return getSupabase(accessToken ?? "");
	}, []);

	const { data: userData } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			if (!supabase) return;
			return supabase
				.from("users")
				.select("*")
				.eq("id", profileAddress)
				.single<{ id: string; username: string; image: string }>();
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

	const { data, isLoading } = useQuery({
		queryKey: [`PROFILE_${profileAddress}`],
		queryFn: fetchTokens,
	});

	const isAuthenticatedUser = userData?.data?.id === user?.wallet?.address;

	return (
		<View className="max-w-xl flex-1 flex items-center w-full gap-8">
			<View className="items-center gap-2">
				<Avatar
					user={userData?.data}
					id={id}
					isAuthenticatedUser={isAuthenticatedUser}
					supabase={supabase}
				/>
				<Row className="items-center">
					{isAuthenticatedUser ? (
						isEditing ? (
							<EditProfileForm
								oldUsername={userData?.data?.username ?? ""}
								setIsEditing={setIsEditing}
								supabase={supabase}
								id={id}
							/>
						) : (
							<>
								<Text className="font-bold text-xl">
									{userData?.data?.username}
								</Text>
								<Button
									variant={"ghost"}
									size={"icon"}
									onPress={() => setIsEditing(true)}
								>
									<Edit3 className="w-4 h-4 mt-1" />
								</Button>
							</>
						)
					) : (
						<Text className="font-bold text-xl">
							{userData?.data?.username}
						</Text>
					)}
				</Row>

				<Button
					variant={"link"}
					className="py-0 flex text-xs"
					onPress={handleCopy}
				>
					{formatAddress(profileAddress)}
					{copied ? (
						<Check className="w-3 h-3 ml-2 mt-1" />
					) : (
						<Copy className="w-3 h-3 ml-2 mt-1" />
					)}
				</Button>

				<Text className="text-xs font-semibold mt-1">Collected Seasons</Text>
			</View>

			<View className="flex sm:flex-row flex-wrap items-center sm:justify-between max-w-md w-full mx-auto gap-2">
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
		</View>
	);
}
