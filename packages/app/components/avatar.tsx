import { Pressable, View } from "@repo/app/ui";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader } from "lucide-react-native";
import { useRef, useState } from "react";
import type { Database } from "../lib";

interface AvatarProps {
	user?: { id: string; username: string; image: string } | null;
	id: string;
	isAuthenticatedUser: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	supabase?: SupabaseClient<Database, "public", any>;
}

export function Avatar({
	user,
	id,
	isAuthenticatedUser,
	supabase,
}: AvatarProps) {
	const [isLoading, setIsLoading] = useState(false);

	const avatarRef = useRef<HTMLInputElement | null>(null);

	const client = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			setIsLoading(true);
			if (!avatarRef.current?.files?.[0] || !supabase) return;
			const imageId = crypto.randomUUID();

			const { data, error } = await supabase.storage
				.from("avatars")
				.upload(`${imageId}.png`, avatarRef.current.files[0]);

			if (error) throw error;

			return data;
		},
		onSuccess: async (data) => {
			if (!supabase || !data) return;
			await supabase
				.from("users")
				.update({
					image: data.path,
				})
				.eq("id", id);

			await client.invalidateQueries({
				queryKey: ["user"],
			});

			setIsLoading(false);
		},
	});

	const loading = isLoading || isPending;

	const avatarUrl = supabase?.storage
		.from("avatars")
		.getPublicUrl(user?.image ?? "").data.publicUrl;

	return (
		<View className="w-20 h-20 rounded-full bg-gradient-final group relative">
			<img
				src={
					user?.image
						? avatarUrl
						: `https://api.dicebear.com/9.x/shapes/svg?seed=${id}`
				}
				alt={user?.username}
				className="absolute inset-0 h-20 w-20 rounded-full object-cover"
			/>

			{isAuthenticatedUser && !loading && (
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

			{loading && (
				<View className="absolute inset-0 flex items-center justify-center backdrop-blur-md rounded-full">
					<Loader className="w-8 h-8 text-primary" />
				</View>
			)}
		</View>
	);
}
