import { useQuery } from "@tanstack/react-query";
import { fetchTokenMinters } from "@wavpoint/app/gql";
import type { TokenQuery } from "@wavpoint/app/gql/indexer/graphql";
import { useSupabase } from "@wavpoint/app/hooks";
import { Row, Text, View } from "@wavpoint/app/ui";
import { Link } from "solito/link";
import { Avatar } from "../avatar";

interface MixCollectorsTabProps {
	tab: string;
	token: TokenQuery["token"];
}

export function MixCollectorsTab({ token, tab }: MixCollectorsTabProps) {
	const supabase = useSupabase();

	const { data: collectors } = useQuery({
		queryKey: [`COLLECTORS_${token?.tokenId}`],
		queryFn: async () => {
			const minters = await fetchTokenMinters(token?.tokenId ?? "");

			if (!supabase) return;

			const { data: users } = await supabase
				.from("users")
				.select("username, image, id")
				.in(
					"id",
					minters.map((minter) => minter.user.id),
				);

			if (!users) return;

			const supabaseUserMap = new Map(users.map((user) => [user.id, user]));

			return minters.map((minter) => {
				const supabaseUser = supabaseUserMap.get(minter.user.id);
				return {
					...minter,
					user: {
						...minter.user,
						username: supabaseUser?.username || minter.user.username,
						image: supabaseUser?.image || minter.user.image,
					},
					isUser: !!supabaseUser?.id,
				};
			});
		},
		enabled: !!token?.tokenId && tab === "collectors",
	});

	return (
		<View className="gap-4">
			{collectors?.map((collector) => {
				if (collector.isUser) {
					return (
						<Link
							href={`/profile/${collector.user.id}`}
							key={collector.user.id}
						>
							<Row className="justify-between items-center">
								<Row className="flex items-center gap-2">
									<Avatar
										className="w-9 h-9"
										size={36}
										id={collector.user.id}
										user={{
											...collector.user,
										}}
										isAuthenticatedUser={false}
										defaultAvatar={
											collector.user.image ? collector.user.image : undefined
										}
									/>
									<Text className="underline">{collector.user.username}</Text>
								</Row>

								<Row className="items-center gap-1">
									{token?.topMinterId.toLowerCase() ===
										collector.user.id.toLowerCase() && (
										<Text className="py-1 px-2 rounded-lg bg-primary text-black text-xs">
											Top Minter
										</Text>
									)}
									{token?.firstMinterId.toLowerCase() ===
										collector.user.id.toLowerCase() && (
										<Text className="py-1 px-2 rounded-lg bg-gradient-final text-black text-xs">
											First Minter
										</Text>
									)}
									<Text className="pl-4">{collector.amountOwned}</Text>
								</Row>
							</Row>
						</Link>
					);
				}

				return (
					<Row className="justify-between items-center" key={collector.user.id}>
						<Row className="flex items-center gap-2">
							<Avatar
								className="w-9 h-9"
								size={36}
								id={collector.user.id}
								isAuthenticatedUser={false}
								defaultAvatar={
									collector.user.image ? collector.user.image : undefined
								}
							/>
							<Text className="underline">{collector.user.username}</Text>
						</Row>

						<Row className="items-center gap-1">
							{token?.topMinterId.toLowerCase() ===
								collector.user.id.toLowerCase() && (
								<Text className="py-1 px-2 rounded-lg bg-primary text-black text-xs">
									Top Minter
								</Text>
							)}
							{token?.firstMinterId.toLowerCase() ===
								collector.user.id.toLowerCase() && (
								<Text className="py-1 px-2 rounded-lg bg-gradient-final text-black text-xs">
									First Minter
								</Text>
							)}
							<Text className="pl-4">{collector.amountOwned}</Text>
						</Row>
					</Row>
				);
			})}
		</View>
	);
}
