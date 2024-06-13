import { PrivyClient } from "@privy-io/server-auth";
import { formatAddress } from "@repo/utils";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const expToExpiresIn = (exp: number) => exp - Math.floor(Date.now() / 1000);

export async function POST(req: Request) {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.SUPABASE_SERVICE_ROLE_KEY ||
		!process.env.SUPABASE_JWT_SECRET ||
		!process.env.PRIVY_APP_ID ||
		!process.env.PRIVY_APP_SECRET
	)
		return new Response(null, { status: 500 });

	const cookieStore = cookies();

	// omit expiration time,.it will conflict with jwt.sign
	const data = await req.json();
	const accessToken = data.accessToken;
	const token = accessToken.replace(/^Bearer /, "");

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

	await supabase.from("User").upsert({
		id: user.wallet.address,
		username: formatAddress(user.wallet.address),
		image: "",
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
