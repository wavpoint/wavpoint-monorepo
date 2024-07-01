import { cookieName, getSupabase } from "@wavpoint/app/lib";
import Cookies from "js-cookie";
import { useMemo } from "react";

export function useSupabase() {
	const supabase = useMemo(() => {
		const accessToken = Cookies.get(cookieName);
		return getSupabase(accessToken ?? "");
	}, []);

	return supabase;
}
