import { Button, Row, TextLink, View } from "@repo/app/ui";

import { cn, mintCountQueryDocument } from "@repo/app/lib";
import { COLLECTION_ADDRESS, VINYL_GOAL, ipfsToUrl } from "@repo/utils";
import { useQuery } from "@tanstack/react-query";
import type { TokensResponseItem } from "@zoralabs/zdk";
import request from "graphql-request";
import { Disc3, Download } from "lucide-react-native";
import { Link } from "solito/link";
import { ShareDialog } from "../features/dialogs/share-arrow";
import { graphql } from "../gql";

interface SeasonCardProps {
	token: TokensResponseItem["token"];
}

export function SeasonCard({ token }: SeasonCardProps) {
	const { data: mintData } = useQuery({
		queryKey: [`MINT_${token.tokenId}`],
		queryFn: async () =>
			request("http://localhost:42069", mintCountQueryDocument, {
				tokenId: `${token.tokenId}:${COLLECTION_ADDRESS}`,
			}),
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
							{mintData?.mintCount?.mintCount}
						</Button>

						<Row className="gap-2 font-bold">
							{/* <Button
								variant={"ghost"}
								size={"icon"}
								className="h-auto w-auto"
							>
								<Download className="w-4 h-4" />
							</Button> */}
							<Button
								variant={"ghost"}
								size={"icon"}
								className={cn(
									"h-auto w-auto",
									(mintData?.mintCount?.mintCount ?? 0) > VINYL_GOAL &&
										"text-primary",
								)}
							>
								<Disc3 className="w-4 h-4" />
							</Button>
						</Row>
					</Row>
				</View>
			</Link>

			<Row className="gap-0.5 w-[200px] items-start overflow-hidden relative">
				<Button
					variant={"link"}
					className="px-0 font-bold grow whitespace-nowrap overflow-hidden rounded-none"
					size={"sm"}
				>
					<TextLink href={`/mix/${token.tokenId}`} className="w-full">
						{token.name}
					</TextLink>
					<View className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white pointer-events-none" />
				</Button>
				<ShareDialog />
			</Row>
		</View>
	);
}
