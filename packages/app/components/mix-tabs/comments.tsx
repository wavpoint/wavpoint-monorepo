import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchMintsWithComments } from "@wavpoint/app/gql";
import { useSupabase } from "@wavpoint/app/hooks";
import { formatDistance } from "@wavpoint/app/lib";
import { Button, Row, Text, View } from "@wavpoint/app/ui";
import { formatDistanceToNow } from "date-fns";
import { Link } from "solito/link";
import { Avatar } from "../avatar";

interface MixCommentsTabProps {
	tokenId?: string;
	tab: string;
}

export function MixCommentsTab({ tokenId, tab }: MixCommentsTabProps) {
	const supabase = useSupabase();
	const { authenticated, ready, login } = usePrivy();

	const unauthenticated = !authenticated && ready;

	const { data: comments } = useQuery({
		queryFn: async () => {
			const comments = await fetchMintsWithComments(tokenId ?? "");

			if (!supabase) return;

			const { data: users } = await supabase
				.from("users")
				.select("username, image, id")
				.in(
					"id",
					comments.map((comment) => comment.user.id),
				);

			if (!users) return;

			const supabaseUserMap = new Map(users.map((user) => [user.id, user]));

			return comments.map((comment) => {
				const supabaseUser = supabaseUserMap.get(comment.user.id);
				return {
					...comment,
					user: {
						...comment.user,
						username: supabaseUser?.username || comment.user.username,
						image: supabaseUser?.image || comment.user.image,
					},
					isUser: !!supabaseUser?.id,
				};
			});
		},
		queryKey: [`COMMENTS_${tokenId}`],
		enabled: !!tokenId && tab === "comments",
	});

	return (
		<View className="gap-4">
			{unauthenticated && (
				<Button
					onPress={login}
					className="rounded-md bg-gradient-final web:hover:bg-gradient-final/80 w-min"
				>
					<Text className="text-primary mr-1">Connect</Text>{" "}
					<Text className="text-black">to leave a comment</Text>
				</Button>
			)}

			{comments?.map((comment) => (
				<Row className="flex gap-2 h-9" key={comment.user.id}>
					{comment.isUser ? (
						<Link href={`/profile/${comment.user.id}`}>
							<Avatar
								className="w-9 h-9"
								size={36}
								id={comment.user.id}
								isAuthenticatedUser={false}
								defaultAvatar={
									comment.user.image ? comment.user.image : undefined
								}
							/>
						</Link>
					) : (
						<Avatar
							className="w-9 h-9"
							size={36}
							id={comment.user.id}
							isAuthenticatedUser={false}
							user={{
								...comment.user,
							}}
							defaultAvatar={
								comment.user.image ? comment.user.image : undefined
							}
						/>
					)}
					<View>
						{comment.isUser ? (
							<Link href={`/profile/${comment.user.id}`}>
								<Text className="font-bold text-xs">
									{comment.user.username}
								</Text>
							</Link>
						) : (
							<Text className="font-bold text-xs">{comment.user.username}</Text>
						)}
						<Text className="text-primary text-xs">
							{formatDistanceToNow(new Date(Number(comment.timestamp) * 1000), {
								locale: { formatDistance },
							})}
						</Text>
					</View>
					<Text className="h-full text-xs">
						{comment.comment.replaceAll("\n", " ")}
					</Text>
				</Row>
			))}
		</View>
	);
}
