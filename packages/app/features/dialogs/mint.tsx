import { Disc3, Download } from "lucide-react-native";
import { useState } from "react";
import { SolitoImage } from "solito/image";
import { cn } from "../../lib/utils";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	Input,
	Row,
	Text,
	View,
	buttonVariants,
} from "../../ui";
import { useMediaQuery } from "../../ui/primitives/hooks";
import { Slider } from "../../ui/slider";
import ClaimDialogContent from "./claim";

const MAX = 111;

export default function MintDialogContent() {
	const [value, setValue] = useState(1);

	return (
		<Row className="flex justify-center">
			<View className="px-8 py-4 gap-4 max-w-xl w-full">
				<Input placeholder="Comment" />
				<View>
					<Slider
						value={value}
						min={1}
						max={MAX}
						onValueChange={(vals) => {
							const nextValue = vals[0];
							if (typeof nextValue !== "number") return;
							setValue(nextValue);
						}}
					/>
					<Row className="w-full flex justify-between">
						<Text className="text-xs">QTY: {value}</Text>
						<Text className="text-xs">{value * 0.000777} ETH ($2.50 USD)</Text>
					</Row>
				</View>
				<Button
					variant="outline"
					className="border-primary text-primary font-semibold gap-2"
				>
					<SolitoImage
						src="/zorb.png"
						height={14}
						width={14}
						contentFit={"contain"}
						onLayout={{}}
						resizeMode={"cover"}
						alt="A cool image, imported locally."
					/>
					Mint +
				</Button>

				<Row className="gap-6 justify-center w-full">
					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setValue(3)}
					>
						3
					</Button>

					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setValue(20)}
					>
						20
					</Button>

					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setValue(MAX)}
					>
						MAX
					</Button>
				</Row>
				<View className="flex items-center gap-2">
					<Text className="text-sm">
						Collect <Text className="text-primary text-sm">3+</Text> to download
						IDs
					</Text>
					<Text className="text-sm">
						Collect <Text className="text-primary text-sm">20+</Text> to be
						eligible to claim vinyl
					</Text>
				</View>

				<Row className="justify-center gap-1">
					<Button variant="ghost" className="gap-1 text-gray-400 text-xs">
						<Download className="w-4 h-4" />
						Download IDs
					</Button>

					<ClaimDialog />
				</Row>
			</View>
		</Row>
	);
}

export function ClaimDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" className="gap-1 text-gray-400 text-xs">
						<Disc3 className="w-4 h-4" />
						Claim Vinyl
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<ClaimDialogContent />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Text
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"cursor-pointer gap-1 text-gray-400 text-xs",
					)}
				>
					<Disc3 className="w-4 h-4" />
					Claim Vinyl
				</Text>
			</DrawerTrigger>
			<DrawerContent>
				<ClaimDialogContent />
			</DrawerContent>
		</Drawer>
	);
}
