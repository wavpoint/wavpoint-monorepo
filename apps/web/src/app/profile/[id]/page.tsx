import { ProfileScreen } from "@wavpoint/app/features/profile/screen";
import type { Database } from "@wavpoint/app/lib";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface GenerateMetadataProps {
	params: { id: string };
}

export async function generateMetadata({
	params,
}: GenerateMetadataProps): Promise<Metadata> {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.SUPABASE_SERVICE_ROLE_KEY
	)
		return redirect("/");

	const id = params.id;

	const cookieStore = cookies();

	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.SUPABASE_SERVICE_ROLE_KEY,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({ name, value: "", ...options });
				},
			},
		},
	);

	const user = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single<{ id: string; username: string; image: string }>();

	if (!user.data) return notFound();

	const avatarUrl = supabase.storage
		.from("avatars")
		.getPublicUrl(user.data.image).data.publicUrl;

	const image = avatarUrl ?? "/default_avatar.jpg";

	const title = user.data.username;
	const url = new URL(`/profile/${id}`, "https://app.wavpoint.tech");
	const description = `View ${user.data.username}'s profile and their collected seasons on Wavpoint.`;
	return {
		title,
		description,
		openGraph: {
			title,
			siteName: "Wavpoint - Exclusive Onchain Music",
			description,
			images: [image],
			username: user.data?.username,
			url,
		},
		twitter: {
			title,
			card: "summary",
			images: [image],
		},
	};
}

export default function Profile() {
	return <ProfileScreen />;
}
