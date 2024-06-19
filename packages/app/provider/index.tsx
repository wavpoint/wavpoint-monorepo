// @ts-nocheck
"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useServerInsertedHTML } from "next/navigation";
import { Toaster } from "react-hot-toast";
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
				appId="clv3z3adf03lx113efeizkdpb"
				config={{
					embeddedWallets: {
						createOnLogin: "users-without-wallets",
					},
				}}
			>
				<QueryClientProvider client={queryClient}>
					<JotaiProvider>
						<PortalHost />
						<Toaster />
						{children}
					</JotaiProvider>
				</QueryClientProvider>
			</PrivyProvider>
		</SafeArea>
	);
}
