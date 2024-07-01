// @ts-nocheck
"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "burnt/web";
import { Provider as JotaiProvider } from "jotai";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheet } from "react-native";
import { PortalHost } from "../ui/primitives/portal";
import { SafeArea } from "./safe-area";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	useServerInsertedHTML(() => {
		const sheet = StyleSheet.getSheet();
		return (
			<style
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: sheet.textContent }}
				id={sheet.id}
			/>
		);
	});
	return (
		<SafeArea>
			<PrivyProvider
				appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
				config={{
					embeddedWallets: {
						createOnLogin: "users-without-wallets",
					},
					appearance: {
						walletList: [
							"coinbase_wallet",
							"detected_wallets",
							"metamask",
							"coinbase",
							"rainbow",
							"wallet_connect",
						],
					},
					externalWallets: {
						coinbaseWallet: {
							// Valid connection options include 'eoaOnly' (default), 'smartWalletOnly', or 'all'
							connectionOptions: "all",
						},
					},
				}}
			>
				<QueryClientProvider client={queryClient}>
					<JotaiProvider>
						{children}
						<Toaster position="top-center" />
					</JotaiProvider>
				</QueryClientProvider>
			</PrivyProvider>
			<PortalHost />
		</SafeArea>
	);
}
