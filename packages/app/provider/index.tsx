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
				appId="cleywwlvl000yme08g6c7stv2"
				config={{
					embeddedWallets: {
						createOnLogin: "users-without-wallets",
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
