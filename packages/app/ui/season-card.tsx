import { Button, Row, View } from "@repo/app/ui";

import { useQuery } from "@tanstack/react-query";
import type { TokensResponseItem } from "@zoralabs/zdk";
import { Disc3, Download } from "lucide-react-native";
import { Link } from "solito/link";
import { ShareDialog } from "../features/dialogs/share-arrow";
import { ipfsToUrl } from "../lib/utils";
import { COLLECTION_ADDRESS, zdk } from "../lib/zdk";

interface SeasonCardProps {
	token: TokensResponseItem["token"];
}

export function SeasonCard({ token }: SeasonCardProps) {
	const fetchMints = async () => {
		const data = await zdk.sdk.ownersByCount1155({
			where: {
				collectionAddress: COLLECTION_ADDRESS,
				tokenId: token.tokenId,
			},
		});

		let mintCount = 0;

		data.aggregateStat.ownersByCount1155.map((owner) => {
			mintCount += owner.count;
		});

		return mintCount;
	};

	const { data: mintCount } = useQuery({
		queryKey: [`MINT_${token.tokenId}`],
		queryFn: fetchMints,
		enabled: !!token.tokenId,
	});

	return (
		<View className="gap-1">
			<Link href={`/mix/${token.tokenId}`}>
				<View className="w-[200px] h-[200px] flex justify-end bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md p-2">
					<img
						src={ipfsToUrl(token.image?.url)}
						alt=""
						className="absolute inset-0 rounded-md"
					/>
					<Row className="flex justify-between items-end">
						<Button variant={"outline"} size={"sm"}>
							{mintCount}
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
