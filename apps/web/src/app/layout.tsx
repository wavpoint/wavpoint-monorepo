import "./globals.css";
import "raf/polyfill";
import { DefaultLayout } from "@repo/app/features/layouts";
import { Providers } from "@repo/app/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Wavpoint - Exclusive Onchain Music",
		template: "%s | Wavpoint",
	},
	description: "Very rare onchain MiniMixes & white label vinyl drops.",
	openGraph: {
		title: {
			default: "Wavpoint - Exclusive Onchain Music",
			template: "%s | Wavpoint",
		},
		url: "https://app.wavpoint.tech",
		siteName: "Wavpoint - Exclusive Onchain Music",
		description: "Very rare onchain MiniMixes & white label vinyl drops.",
		images: ["https://app.wavpoint.tech/logo.png"],
	},
	twitter: {
		title: {
			default: "Wavpoint - Exclusive Onchain Music",
			template: "%s | Wavpoint",
		},
		card: "summary",
		description: "Very rare onchain MiniMixes & white label vinyl drops.",
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
