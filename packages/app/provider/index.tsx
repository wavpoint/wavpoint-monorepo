// @ts-nocheck
"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheet } from "react-native";
import { WagmiProvider } from "wagmi";
import { config } from "../lib/wagmi";
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
				appId="clv3z3adf03lx113efeizkdpb"
				config={{
					embeddedWallets: {
						createOnLogin: "users-without-wallets",
					},
				}}
			>
				<QueryClientProvider client={queryClient}>
					<WagmiProvider config={config}>
						<PortalHost />
						{children}
					</WagmiProvider>
				</QueryClientProvider>
			</PrivyProvider>
		</SafeArea>
	);
}
