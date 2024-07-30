import type { TokenQuery } from "@wavpoint/app/gql/indexer/graphql";
import { Row, Text, View } from "@wavpoint/app/ui";
import { capitalize, formatAddress } from "@wavpoint/utils";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

interface MixDetailsTabProps {
	token: TokenQuery["token"];
}

export function MixDetailsTab({ token }: MixDetailsTabProps) {
	return (
		<View className="divide-y divide-primary border-y border-primary">
			<Row className="py-4 w-full justify-between items-center">
				<Text>Blockchain</Text>
				<Row className="gap-1 items-center">
					{token?.blockchain === "base" && (
						<>
							<SolitoImage
								src={"https://wavpoint.tech/base.svg"}
								alt="Base Logo"
								width={20}
								height={20}
								contentFit={"cover"}
								onLayout={{}}
								resizeMode={"cover"}
							/>
							<Text className="font-bold">Base</Text>
						</>
					)}
					{token?.blockchain === "zora" && (
						<>
							<SolitoImage
								src={"/zorb.png"}
								alt="Base Logo"
								width={20}
								height={20}
								contentFit={"cover"}
								onLayout={{}}
								resizeMode={"cover"}
							/>
							<Text className="font-bold">Zora</Text>
						</>
					)}
					{token?.blockchain !== "base" && token?.blockchain !== "zora" && (
						<Text className="font-bold">
							{capitalize(token?.blockchain ?? "")}
						</Text>
					)}
				</Row>
			</Row>
			<Row className="py-4 w-full justify-between items-center">
				<Text>Token ID</Text>
				<Text>{token?.tokenId}</Text>
			</Row>
			<Row className="py-4 w-full justify-between items-center">
				<Text>Contract</Text>
				<Link
					href={`https://explorer.zora.energy/address/${token?.collectionAddress.toLowerCase()}`}
				>
					<Text className="underline">
						{formatAddress(token?.collectionAddress.toLowerCase())}
					</Text>
				</Link>
			</Row>
			<Row className="py-4 w-full justify-between items-center">
				<Text>Token Standard</Text>
				{token?.tokenStandard === "erc1155" && (
					<Text className="underline">ERC-1155</Text>
				)}
				{token?.tokenStandard !== "erc1155" && (
					<Text className="underline">{token?.tokenStandard}</Text>
				)}
			</Row>
			<Row className="py-4 w-full justify-between items-center">
				<Text>Medium</Text>
				<Text className="underline">
					{capitalize(token?.medium.split("/")[0] ?? "")}
					{` (${token?.medium.split("/")[1]?.toUpperCase()})`}
				</Text>
			</Row>
		</View>
	);
}
