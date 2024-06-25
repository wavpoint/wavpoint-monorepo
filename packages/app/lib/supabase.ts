import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "@wavpoint/utils";

export const cookieName = "sb-access-token";

const getSupabase = (accessToken: string) => {
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	)
		return;

	const options: SupabaseClientOptions<"public"> = {};

	if (accessToken) {
		options.global = {
			headers: {
				// This gives Supabase information about the user (wallet) making the request
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}

	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		options,
	);

	return supabase;
};

export { getSupabase };
