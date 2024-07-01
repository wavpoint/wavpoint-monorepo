import { PrivyClient } from "@privy-io/server-auth";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import {
	type Database,
	WavpointAPIError,
	formatAddress,
	loginSchema,
} from "@wavpoint/utils";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { http, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

const expToExpiresIn = (exp: number) => exp - Math.floor(Date.now() / 1000);

export async function POST(req: Request) {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.SUPABASE_SERVICE_ROLE_KEY ||
		!process.env.SUPABASE_JWT_SECRET ||
		!process.env.PRIVY_APP_ID ||
		!process.env.PRIVY_APP_SECRET ||
		!process.env.MAINNET_RPC
	)
		throw new WavpointAPIError([{ message: "Something went wrong!" }], 500);

	const cookieStore = cookies();

	const response = loginSchema.safeParse(await req.json());

	if (!response.success) {
		const { errors } = response.error;

		throw new WavpointAPIError([], 400, errors);
	}

	const token = response.data.accessToken.replace(/^Bearer /, "");

	const privy = new PrivyClient(
		process.env.PRIVY_APP_ID,
		process.env.PRIVY_APP_SECRET,
	);

	const { expiration, userId } = await privy.verifyAuthToken(token);

	const user = await privy.getUser(userId);

	const expiresIn = expToExpiresIn(expiration);

	if (!user.wallet?.address)
		return new Response(null, {
			status: 403,
		});

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

	const mainnetClient = createPublicClient({
		chain: mainnet,
		transport: http(process.env.MAINNET_RPC),
	});

	const ens = await mainnetClient.getEnsName({
		address: user.wallet.address as `0x${string}`,
	});

	await supabase.from("users").insert({
		id: user.wallet.address,
		username: ens ?? formatAddress(user.wallet.address),
		image: null,
	});

	const supabaseJWT = jwt.sign(
		{
			wallet_address: user.wallet.address,
		},
		process.env.SUPABASE_JWT_SECRET,
		{
			expiresIn,
		},
	);

	// Set a new cookie with the name
	return new Response(null, {
		status: 200,
		headers: {
			"Set-Cookie": cookie.serialize("sb-access-token", supabaseJWT, {
				path: "/",
				secure: process.env.NODE_ENV !== "development",
				// allow the cookie to be accessed client-side
				httpOnly: false,
				sameSite: "strict",
				maxAge: expiresIn,
			}),
		},
	});
}
