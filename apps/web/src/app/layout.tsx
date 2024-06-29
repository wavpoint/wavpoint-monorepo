import "./globals.css";
import { DefaultLayout } from "@wavpoint/app/features/layouts";
import { Providers } from "@wavpoint/app/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Wavpoint - Rare Onchain Minimixes",
		template: "%s | Wavpoint",
	},
	description: "Rare Onchain Minimixes.",
	openGraph: {
		title: {
			default: "Wavpoint - Rare Onchain Minimixes",
			template: "%s | Wavpoint",
		},
		url: "https://app.wavpoint.tech",
		siteName: "Wavpoint - Rare Onchain Minimixes",
		description: "Rare Onchain Minimixes.",
		images: ["https://app.wavpoint.tech/logo.png"],
	},
	twitter: {
		title: {
			default: "Wavpoint - Rare Onchain Minimixes",
			template: "%s | Wavpoint",
		},
		card: "summary",
		description: "Rare Onchain Minimixes.",
		site: "https://app.wavpoint.tech",
		images: ["https://app.wavpoint.tech/logo.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Providers>
				<body className={inter.className}>
					<DefaultLayout>{children}</DefaultLayout>
				</body>
			</Providers>
		</html>
	);
}
