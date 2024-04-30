"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	Progress,
	Row,
	Text,
	View,
	buttonVariants,
} from "@repo/app/ui";

import { ArrowUpRight, PlayIcon } from "lucide-react-native";
import { useState } from "react";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";
import { cn } from "../../../lib/utils";
import { useMediaQuery } from "../../../ui/primitives/hooks";
import MintDialogContent from "../../dialogs/mint";

const useMixParams = useParams<{ id: string }>;

export function MixScreen() {
	const { id } = useMixParams();

	return (
		<DefaultLayout>
			<View className="max-w-xl items-center gap-2 flex-1 w-full">
				<View className="w-[200px] h-[200px] bg-gradient-initial rounded-md flex items-center justify-center mt-2">
					<PlayIcon className="w-8 h-8" fill={"black"} />
				</View>

				<Row className="px-0 items-center">
					<Text className="text-sm font-bold underline">
						S{id} - Lootmatic & Trucalyptus
					</Text>

					<ArrowUpRight className="w-4 h-4 mt-1 text-primary" />
				</Row>

				<View className="w-[200px] items-center">
					<Row className="justify-between w-full">
						<Text className="text-[10px]">0</Text>
						<Text className="text-[10px]">1,111</Text>
						<Text className="text-[10px]">7,777</Text>
					</Row>
					<Progress value={1100} max={7777} className="w-11/12" />
					<Row className="w-full flex">
						<Text className="text-[10px] grow">Onchain</Text>
						<Text className="text-[10px] grow">Downloads</Text>
						<Text className="text-[10px] grow">Vinyl</Text>
					</Row>
				</View>

				<MintDialog />

				<View className="w-full mt-8 gap-3">
					{Array.from({ length: 10 }).map((_, i) => (
						<View key={`${i * 2}`} className="w-full">
							<Text className="text-sm font-semibold">Track ID</Text>
							<Text className="text-xs italic font-extralight">
								Artist Name
							</Text>
						</View>
					))}
				</View>
			</View>
		</DefaultLayout>
	);
}

function MintDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="border-primary text-primary font-semibold gap-1"
					>
						<SolitoImage
							src="/zorb.png"
							height={14}
							width={14}
							contentFit={"contain"}
							onLayout={{}}
							resizeMode={"cover"}
							alt="A cool image, imported locally."
						/>{" "}
						Mint +
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<MintDialogContent />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Text
					className={cn(
						buttonVariants({ variant: "outline" }),
						"cursor-pointer border-primary text-primary font-semibold gap-1",
					)}
				>
					<SolitoImage
						src="/zorb.png"
						height={14}
						width={14}
						contentFit={"contain"}
						onLayout={{}}
						resizeMode={"cover"}
						alt="A cool image, imported locally."
					/>{" "}
					Mint +
				</Text>
			</DrawerTrigger>
			<DrawerContent>
				<MintDialogContent />
			</DrawerContent>
		</Drawer>
	);
}
