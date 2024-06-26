import { type AuthTokenClaims, PrivyClient } from "@privy-io/server-auth";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import {
	type Database,
	WavpointAPIError,
	claimFormSchema,
	fetchIsOwnerOfToken,
} from "@wavpoint/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	try {
		if (
			!process.env.NEXT_PUBLIC_SUPABASE_URL ||
			!process.env.SUPABASE_SERVICE_ROLE_KEY ||
			!process.env.PRIVY_APP_ID ||
			!process.env.PRIVY_APP_SECRET
		)
			throw new WavpointAPIError([{ message: "Something went wrong!" }], 500);

		const response = claimFormSchema.safeParse(await req.json());

		if (!response.success) {
			const { errors } = response.error;

			throw new WavpointAPIError([], 400, errors);
		}

		const cookieStore = cookies();

		const accessToken = cookieStore.get("privy-token")?.value;

		const privy = new PrivyClient(
			process.env.PRIVY_APP_ID,
			process.env.PRIVY_APP_SECRET,
		);

		let authToken: AuthTokenClaims;

		try {
			authToken = await privy.verifyAuthToken(accessToken ?? "");
		} catch (error) {
			throw new WavpointAPIError([{ message: "Unauthorized" }], 403);
		}

		const user = await privy.getUser(authToken.userId);

		if (!user.wallet?.address)
			throw new WavpointAPIError([
				{
					message: "No wallet attached!",
				},
			]);

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

		const { address, email, mixCollectionAddress, mixTokenId, name } =
			response.data;

		const data = await supabase
			.from("connections")
			.select("vinyl_token_id,vinyl_address")
			.eq("minimix_address", mixCollectionAddress)
			.eq("minimix_token_id", mixTokenId)
			.single();

		console.log(data);

		if (!data.data)
			throw new WavpointAPIError(
				[
					{
						message: "Vinyl Token not found!",
					},
				],
				404,
			);

		const { vinyl_token_id, vinyl_address } = data.data;

		if (!vinyl_address || !vinyl_token_id)
			throw new WavpointAPIError(
				[
					{
						message: "Vinyl Token not found!",
					},
				],
				404,
			);

		const userHoldsClaimToken = await fetchIsOwnerOfToken(
			user.wallet.address,
			vinyl_token_id,
			vinyl_address,
		);

		if (!userHoldsClaimToken)
			throw new WavpointAPIError([
				{
					message: "You are not eligible to claim this vinyl!",
				},
			]);

		const insert = await supabase.from("claims").insert({
			address,
			name,
			email,
			vinyl_token_id,
			vinyl_address,
			wallet_address: user.wallet.address,
		});

		if (insert.error) {
			if (insert.error.code === "23505")
				throw new WavpointAPIError([
					{ message: "You have already claimed this vinyl!" },
				]);

			console.error(insert.error);
			throw new WavpointAPIError([{ message: "Something went wrong!" }], 500);
		}

		return new Response(null, { status: 201 });
	} catch (error) {
		if (error instanceof WavpointAPIError) {
			return Response.json(
				{
					type: "WavpointAPIError",
					errors: error.errors,
					zodErrors: error.zodErrors,
					status: error.status,
				},
				{
					status: error.status,
				},
			);
		}

		return Response.json(
			{
				type: "WavpointAPIError",
				errors: [{ message: "Something went wrong!" }],
				status: 500,
			},
			{ status: 500 },
		);
	}
}