import { MixScreen } from "@repo/app/features/mix/[id]/screen";

import { zdk } from "@repo/app/lib";
import { COLLECTION_ADDRESS, ipfsToUrl } from "@repo/utils";
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

	const tokenData = await zdk.token({
		token: {
			address: COLLECTION_ADDRESS,
			tokenId: id,
		},
	});

	if (!tokenData.token?.token) return notFound();

	const { token } = tokenData.token;

	const title = token.name ?? `Token ${id}`;
	const url = new URL(`/mix/${id}`, "https://app.wavpoint.tech");
	const description = `Stream ${token.name} and mint it directly on Wavpoint.`;
	const image = ipfsToUrl(token.image?.url);

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [image],
			url,
		},
		twitter: {
			title,
			images: [image],
		},
	};
}

export default function Mix() {
	return <MixScreen />;
}
