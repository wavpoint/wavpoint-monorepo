import { WavpointAPIError } from "@wavpoint/utils";
import jwt from "jsonwebtoken";

interface WavpointAuthenticated {
	walletAddress: string;
}

export const authenticate = (accessToken?: string): WavpointAuthenticated => {
	if (!process.env.SUPABASE_JWT_SECRET)
		throw new WavpointAPIError([{ message: "Something went wrong!" }], 500);

	if (!accessToken)
		throw new WavpointAPIError([{ message: "Unauthorized" }], 403);

	const payload = jwt.verify(accessToken, process.env.SUPABASE_JWT_SECRET);

	if (typeof payload === "string")
		throw new WavpointAPIError([{ message: "Unauthorized" }], 403);

	return {
		walletAddress: payload.wallet_address as string,
	};
};
