import type { ConnectedWallet } from "@privy-io/react-auth";
import * as Burnt from "burnt";
import {
	http,
	BaseError,
	CallExecutionError,
	type Chain,
	ContractFunctionExecutionError,
	ContractFunctionRevertedError,
	TransactionExecutionError,
	createPublicClient,
	createWalletClient,
	custom,
} from "viem";
import { mainnet } from "viem/chains";

export const chain: Chain = {
	id: 7777777,
	name: "Virtual Mainnet",
	nativeCurrency: { name: "VETH", symbol: "vETH", decimals: 18 },
	rpcUrls: {
		default: {
			http: [
				"https://virtual.mainnet.rpc.tenderly.co/18f2d3da-616d-4279-a1e9-ee410bd6c570",
			],
		},
	},
	blockExplorers: {
		default: {
			name: "Tenderly Explorer",
			url: "https://virtual.mainnet.rpc.tenderly.co/581e0c47-df1f-4f42-9e03-30f0ad445274",
		},
	},
};

// export const chain = zora;

export const publicClient = createPublicClient({
	// this will determine which chain to interact with
	chain,
	transport: http(),
});

export const mainnetClient = createPublicClient({
	chain: mainnet,
	transport: http(),
});

export const getWalletClient = async (wallet?: ConnectedWallet) => {
	const provider = await wallet?.getEthereumProvider();

	const walletClient = createWalletClient({
		chain,
		transport: provider ? custom(provider) : http(),
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
				Burnt.toast({
					title: "Invalid Currency!",
					haptic: "error",
					preset: "error",
				});
				return;
			}

			if (revertError.signature === "0xfb8f41b2") {
				Burnt.toast({
					title: "You have insufficient ERC-20 funds!",
					haptic: "error",
					preset: "error",
				});
				return;
			}

			console.error(revertError.message, "Is ContractFunctionRevertedError");
			Burnt.toast({
				title: revertError.shortMessage,
				haptic: "error",
				preset: "error",
			});
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
			console.error(transactionError.details, "Is TransactionExecutionError");
			Burnt.toast({
				title: transactionError.shortMessage,
				haptic: "error",
				preset: "error",
			});
			return;
		}

		const contractFunctionExecutionError = error.walk(
			(err) => err instanceof ContractFunctionExecutionError,
		);

		if (
			contractFunctionExecutionError instanceof ContractFunctionExecutionError
		) {
			const callExecutionError = error.walk(
				(err) => err instanceof CallExecutionError,
			);

			if (callExecutionError instanceof CallExecutionError) {
				const errorName = callExecutionError.cause.name;

				if (errorName === "InsufficientFundsError") {
					Burnt.toast({
						title: "You have insufficient funds!",
						haptic: "error",
						preset: "error",
					});
					return;
				}

				console.error(error, "Is CallExecutionError");
				Burnt.toast({
					title: error.shortMessage,
					haptic: "error",
					preset: "error",
				});
				return;
			}

			console.error(error, "Is ContractFunctionExecutionError");
			Burnt.toast({
				title: error.shortMessage,
				haptic: "error",
				preset: "error",
			});
			return;
		}

		console.error(error, "Is BaseError");
		Burnt.toast({
			title: error.shortMessage,
			haptic: "error",
			preset: "error",
		});
		return;
	}

	console.error(error, "Is Unknown Error");
	Burnt.toast({
		title: "Something went wrong! Check console for logs.",
		haptic: "error",
		preset: "error",
	});
};
