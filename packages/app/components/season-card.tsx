import { Button, Row, Text, TextLink, View } from "@wavpoint/app/ui";

import { cn } from "@wavpoint/app/lib";
import { VINYL_GOAL } from "@wavpoint/utils";
import { Disc3 } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";
import { ShareDialog } from "../features/dialogs/share-arrow";
import type { TokensQuery } from "../gql/indexer/graphql";

interface SeasonCardProps {
	token: TokensQuery["tokens"]["items"][number];
}

export function SeasonCard({ token }: SeasonCardProps) {
	return (
		<View className="gap-1">
			<Link href={`/mix/${token.tokenId}`}>
				<View className="w-[200px] h-[200px] flex justify-end bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md p-2">
					<SolitoImage
						src={token.imageUrl}
						onLayout={{}}
						contentFit={"cover"}
						resizeMode={"cover"}
						width={200}
						height={200}
						alt={token.name ?? "Mix Cover"}
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							borderRadius: 6,
						}}
					/>
					<Row className="flex justify-between items-end">
						<Button variant={"outline"} size={"sm"}>
							{token.mintCount ?? <Text className="h-4 w-5" />}
						</Button>

						<Row className="gap-2 font-bold">
							{/* FIXME: Uncomment for mint downloads goal */}
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
									token.mintCount > VINYL_GOAL && "text-primary",
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
				<ShareDialog tokenId={token.tokenId} />
			</Row>
		</View>
	);
}

export function SeasonCardSkeleton() {
	return (
		<View className="gap-1">
			<View className="animate-pulse w-[200px] h-[200px] flex justify-end bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md p-2" />
			<View className="h-6 w-full" />
		</View>
	);
}
