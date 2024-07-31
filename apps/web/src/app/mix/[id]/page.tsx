import { MixScreen } from "@wavpoint/app/features/mix/[id]/screen";
import { fetchToken } from "@wavpoint/app/gql";

import type { Metadata } from "next";
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

	try {
		const token = await fetchToken(id);

		if (!token) return notFound();

		const title = token.name ?? `Token ${id}`;
		const url = new URL(`/mix/${id}`, "https://app.wavpoint.tech");
		const description = `Stream "${token.name}" and mint it directly on Wavpoint.`;

		return {
			title,
			description,
			openGraph: {
				title,
				siteName: "Wavpoint - Exclusive Onchain Music",
				description,
				images: [token.imageUrl],
				url,
			},
			twitter: {
				title,
				card: "summary",
				images: [token.imageUrl],
			},
		};
	} catch (error) {
		console.error(error);
	}

	return {};
}

export default function Mix() {
	return <MixScreen />;
}
