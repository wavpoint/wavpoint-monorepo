import { PrivyClient } from "@privy-io/server-auth";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import {
	COLLECTION_ADDRESS,
	type PlayData,
	type PlayInput,
	WavpointAPIError,
	playSchema,
} from "@wavpoint/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.SUPABASE_SERVICE_ROLE_KEY ||
		!process.env.NEXT_PUBLIC_PRIVY_APP_ID ||
		!process.env.PRIVY_APP_SECRET
	)
		return new Response(null, { status: 500 });

	const cookieStore = cookies();

	const { data, success, error } = playSchema.safeParse(await req.json());

	if (!success) {
		const { errors } = error;

		throw new WavpointAPIError([], 400, errors);
	}

	const accessToken = cookieStore.get("privy-token")?.value;

	const privy = new PrivyClient(
		process.env.NEXT_PUBLIC_PRIVY_APP_ID,
		process.env.PRIVY_APP_SECRET,
	);

	try {
		await privy.verifyAuthToken(accessToken ?? "");
	} catch (error) {
		return new Response(null, { status: 403 });
	}

	const supabase = createServerClient(
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

	const play = await supabase
		.from("plays")
		.select("*")
		.eq("token_id", data.tokenId)
		.eq("collection_address", COLLECTION_ADDRESS)
		.single<PlayData>();

	if (play.data) {
		await supabase
			.from("plays")
			.update<Partial<PlayData>>({
				plays: play.data.plays + 1,
			})
			.eq("token_id", data.tokenId)
			.eq("collection_address", COLLECTION_ADDRESS);
	} else {
		await supabase
			.from("plays")
			.insert<PlayInput>({
				plays: 1,
				collection_address: COLLECTION_ADDRESS,
				token_id: data.tokenId,
			})
			.eq("token_id", data.tokenId)
			.eq("collection_address", COLLECTION_ADDRESS);
	}

	// Set a new cookie with the name
	return new Response(null, {
		status: 200,
	});
}
