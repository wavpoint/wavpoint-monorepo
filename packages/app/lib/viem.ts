import type { ConnectedWallet } from "@privy-io/react-auth";
import {
	http,
	BaseError,
	type Chain,
	ContractFunctionRevertedError,
	TransactionExecutionError,
	createPublicClient,
	createWalletClient,
	custom,
} from "viem";

export const chain: Chain = {
	id: 7777777,
	name: "Virtual",
	nativeCurrency: {
		decimals: 8,
		name: "Virtual Eth",
		symbol: "VETH",
	},
	rpcUrls: {
		default: {
			http: [
				"https://virtual.mainnet.rpc.tenderly.co/581e0c47-df1f-4f42-9e03-30f0ad445274",
			],
		},
	},
};

export const publicClient = createPublicClient({
	// this will determine which chain to interact with
	chain,
	transport: http(),
});

export const getWalletClient = () => {
	const walletClient = createWalletClient({
		chain,
		transport: custom(window?.ethereum),
	});

	return walletClient;
};

export const handleContractErrors = async (
	error: unknown,
	wallets: ConnectedWallet[],
) => {
	if (error instanceof BaseError) {
		const revertError = error.walk(
			(err) => err instanceof ContractFunctionRevertedError,
		);
		if (revertError instanceof ContractFunctionRevertedError) {
			const errorName = revertError.data?.errorName ?? "";
			if (errorName === "InvalidCurrency") {
				await wallets[0]?.switchChain(chain.id);
				return;
			}
			console.error(revertError.details);
			return;
		}

		const transactionError = error.walk(
			(err) => err instanceof TransactionExecutionError,
		);

		if (transactionError instanceof TransactionExecutionError) {
			const errorName = transactionError.cause.name ?? "";
			if (errorName === "UserRejectedRequestError") {
				return;
			}
			console.error(transactionError.details);
			return;
		}
	}

	console.error(error);
};
