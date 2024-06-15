import { P, Pressable, View } from "@repo/app/ui";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react-native";
import { useRef } from "react";

interface AvatarProps {
	user?: { id: string; username: string; image: string } | null;
	id: string;
	isAuthenticatedUser: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	supabase?: SupabaseClient<any, "public", any>;
}

export function Avatar({
	user,
	id,
	isAuthenticatedUser,
	supabase,
}: AvatarProps) {
	const avatarRef = useRef<HTMLInputElement | null>(null);

	const client = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: async () => {
			if (!avatarRef.current?.files?.[0]) return;
			await supabase?.storage
				.from("avatars")
				.upload(`${id}.png`, avatarRef.current.files[0], { upsert: true });
			await supabase
				?.from("users")
				.update({
					image: id,
				})
				.eq("id", id);
		},
		onSuccess: async () => {
			await client.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});

	const avatarUrl = supabase?.storage.from("avatars").getPublicUrl(`${id}.png`)
		.data.publicUrl;

	return (
		<View className="w-20 h-20 rounded-full bg-gradient-final group">
			<img
				src={
					user?.image
						? avatarUrl
						: `https://api.dicebear.com/9.x/shapes/svg?seed=${id}`
				}
				alt={user?.username}
				className="absolute inset-0 rounded-full"
			/>

			{isAuthenticatedUser && (
				<Pressable
					onPress={() => avatarRef.current?.click()}
					className="flex justify-center items-center inset-0 absolute opacity-0 pointer-events-none rounded-full transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 backdrop-blur-md"
				>
					<input
						type="file"
						name="avatar"
						className="hidden"
						ref={avatarRef}
						accept="image/*"
						onChange={() => mutate()}
					/>
					<ImagePlus className="w-8 h-8 text-primary" />
				</Pressable>
			)}
		</View>
	);
}
