import { Button, Row, View, useCopy } from "@repo/app/ui";
import { COLLECTION_ADDRESS } from "@repo/utils";
import { ArrowUpRight, Check, Copy } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

interface ShareDialogContentProps {
	tokenId: string;
}

export default function ShareDialogContent({
	tokenId,
}: ShareDialogContentProps) {
	const { isCopied, copyToClipboard } = useCopy();

	return (
		<Row className="flex justify-center">
			<View className="px-8 py-2 max-w-xl w-full">
				<Link
					href={
						new URL(
							`/collect/zora:${COLLECTION_ADDRESS}/${tokenId}`,
							"https://zora.co",
						)
					}
					target="_blank"
				>
					<Button variant={"link"} className="font-bold gap-1">
						<SolitoImage
							src="/zorb.png"
							height={14}
							width={14}
							contentFit={"contain"}
							onLayout={{}}
							resizeMode={"cover"}
							alt="A cool image, imported locally."
						/>
						Zora Link
						<ArrowUpRight className="w-4 h-4 text-primary" />
					</Button>
				</Link>

				<Button
					variant={"link"}
					className="font-bold gap-1"
					onPress={() =>
						copyToClipboard(`https://app.wavpoint.tech/mix/${tokenId}`)
					}
				>
					<SolitoImage
						src="/logo.png"
						height={16}
						width={26.072}
						contentFit={"contain"}
						onLayout={{}}
						resizeMode={"cover"}
						alt="A cool image, imported locally."
					/>
					Share Link
					{isCopied ? (
						<Check className="w-4 h-4 text-primary" />
					) : (
						<Copy className="w-4 h-4 text-primary" />
					)}
				</Button>
			</View>
		</Row>
	);
}
