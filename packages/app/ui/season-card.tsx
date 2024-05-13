import { Button, Row, View } from "@repo/app/ui";

import { Disc3, Download } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Link } from "solito/link";
import { ShareDialog } from "../features/dialogs/share-arrow";
import type { ContractSummaryResponse, TokenData } from "../lib/zdk";

interface SeasonCardProps {
	token: TokenData;
}

export function SeasonCard({ token }: SeasonCardProps) {
	const [contractSummary, setContractSummary] =
		useState<ContractSummaryResponse>();

	const fetchTokenData = async () => {
		const response = await fetch(
			`https://api.zora.co/discover/contract_summary/ZORA-MAINNET/0xcb11bcaedde64360dcbb0a72a15c4eef509b2f53?token_id=${token.tokenId}`,
		);

		const contract: ContractSummaryResponse = await response.json();

		setContractSummary(contract);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchTokenData();
	}, [token]);

	return (
		<View className="gap-1">
			<Link href={`/mix/${token.tokenId}`}>
				<View className="w-[200px] h-[200px] flex justify-end bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md p-2">
					<img
						src={
							token.image?.url
								? token.image.url?.replace("ipfs://", "https://ipfs.io/ipfs/")
								: ""
						}
						alt=""
						className="absolute inset-0"
					/>
					<Row className="flex justify-between items-end">
						<Button variant={"outline"} size={"sm"}>
							{contractSummary?.contract_summary.mint_count}
						</Button>

						<Row className="gap-2 font-bold">
							<Button
								variant={"ghost"}
								size={"icon"}
								className="h-auto w-auto text-primary"
							>
								<Download className="w-4 h-4" />
							</Button>
							<Button variant={"ghost"} size={"icon"} className="h-auto w-auto">
								<Disc3 className="w-4 h-4" />
							</Button>
						</Row>
					</Row>
				</View>
			</Link>

			<Row className="gap-0.5 w-[200px] items-start justify-center">
				<Link href={`/mix/${token.tokenId}`}>
					<Button
						variant={"link"}
						className="px-0 font-bold shrink"
						size={"sm"}
					>
						{token.name}
					</Button>
				</Link>
				<ShareDialog />
			</Row>
		</View>
	);
}
