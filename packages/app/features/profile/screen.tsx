"use client";

import { Button, Row, Text, View } from "@wavpoint/app/ui";

import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import {
	Avatar,
	EditProfileForm,
	SeasonCard,
	SeasonCardSkeleton,
} from "@wavpoint/app/components";
import { useCopy, useSupabase } from "@wavpoint/app/hooks";
import { formatAddress } from "@wavpoint/utils";
import { Check, Copy, Edit3 } from "lucide-react-native";
import { useState } from "react";
import { useParams } from "solito/navigation";
import { fetchUserTokens } from "../../gql";
import { Skeleton } from "../../ui/skeleton";

const useProfileParams = useParams<{ id: string }>;

export function ProfileScreen() {
	const { id } = useProfileParams();
	const profileAddress = id.replace("/profile/", "");

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const { isCopied, copyToClipboard } = useCopy();

	const supabase = useSupabase();
	const { user } = usePrivy();

	const { data: userData, isLoading: userDataLoading } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			return supabase
				?.from("users")
				.select("*")
				.eq("id", profileAddress)
				.single<{ id: string; username: string; image: string }>();
		},
		enabled: !!supabase && !!profileAddress,
	});

	const { data, isLoading } = useQuery({
		queryKey: [`PROFILE_${profileAddress}`],
		queryFn: () => fetchUserTokens(profileAddress as `0x${string}`),
		enabled: !!profileAddress,
	});

	const isAuthenticatedUser = userData?.data?.id === user?.wallet?.address;

	return (
		<View className="max-w-xl flex-1 flex items-center w-full gap-8">
			<View className="items-center gap-2">
				<Skeleton show={userDataLoading} className="rounded-full">
					<Avatar
						user={userData?.data}
						id={id}
						isAuthenticatedUser={isAuthenticatedUser}
						supabase={supabase}
					/>
				</Skeleton>
				<Row className="items-center">
					<Skeleton show={userDataLoading} className="w-36 h-8">
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
					</Skeleton>
				</Row>

				<Button
					variant={"link"}
					className="py-0 flex text-xs"
					onPress={() => copyToClipboard(profileAddress)}
				>
					{formatAddress(profileAddress)}
					{isCopied ? (
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
