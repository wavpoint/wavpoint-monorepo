import { type TokensQuery, ZDK, ZDKChain, ZDKNetwork } from "@zoralabs/zdk";

const networkInfo = {
	network: ZDKNetwork.Ethereum,
	chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
	endPoint: API_ENDPOINT,
	networks: [networkInfo],
};

export const zdk = new ZDK(args); // All arguments are optional

export type TokenData = TokensQuery["tokens"]["nodes"][number]["token"];

export type ContractSummaryResponse = {
	contract_summary: {
		chain_name: string;
		collection_address: string;
		token_id: string;
		mint_count: number;
		comment_count: number;
		unique_collector_count: number;
		first_minter: {
			address: string;
			username: string;
			display_name: string;
			ens_name: string | null;
			avatar: string;
			current_user_hide_setting: null;
			following_status: string;
		} | null;
		top_minter: {
			minter: {
				address: string;
				username: string;
				display_name: string;
				ens_name: string | null;
				avatar: string;
				current_user_hide_setting: null;
				following_status: string;
			};
			count: number;
		};
		most_recent_mint_time: string;
		mint_transaction_count: number;
		creator_earnings: {
			currency: {
				name: string;
				address: string;
				decimals: number;
			};
			raw: string;
			decimal: number;
		};
		creator_earnings_currencies: [
			{
				currency: {
					name: string;
					address: string;
					decimals: number;
				};
				raw: string;
				decimal: number;
			},
		];
	};
};
