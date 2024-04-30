import { ArrowUpRight, Copy } from "lucide-react-native";
import { SolitoImage } from "solito/image";
import { Button, Row, Text, View } from "../../ui";

export default function ShareDialogContent() {
	return (
		<Row className="flex justify-center">
			<View className="px-8 py-2 max-w-xl w-full">
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

				<Button variant={"link"} className="font-bold gap-1">
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
					<Copy className="w-4 h-4 text-primary" />
				</Button>
			</View>
		</Row>
	);
}
