import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@repo/app/ui";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Loader } from "lucide-react-native";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import type { Database } from "../../lib";

const editProfileSchema = z.object({
	username: z.string().min(3).max(30),
});
type EditProfileInput = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
	oldUsername: string;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	supabase?: SupabaseClient<Database, "public", any>;
	id: string;
}

export function EditProfileForm({
	oldUsername,
	supabase,
	id,
	setIsEditing,
}: EditProfileFormProps) {
	const client = useQueryClient();

	const { handleSubmit, control } = useForm<EditProfileInput>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			username: oldUsername,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ username }: EditProfileInput) =>
			supabase
				?.from("users")
				.update({
					username,
				})
				.eq("id", id),
		onSuccess: async () => {
			await client.invalidateQueries({
				queryKey: ["user"],
			});
			setIsEditing(false);
		},
	});

	return (
		<>
			<Controller
				control={control}
				name="username"
				render={({ field: { onChange, onBlur, value } }) => (
					<Input onBlur={onBlur} onChangeText={onChange} value={value} />
				)}
			/>
			<Button
				variant={"ghost"}
				size={"icon"}
				className="rounded-md"
				onPress={handleSubmit((values) => mutate(values))}
			>
				{isPending ? (
					<Loader className="w-4 h-4" />
				) : (
					<Check className="w-4 h-4" />
				)}
			</Button>
		</>
	);
}
