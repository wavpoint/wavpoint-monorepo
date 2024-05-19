"use client";

import { usePrivy } from "@privy-io/react-auth";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	Row,
	Text,
	View,
	buttonVariants,
} from "@repo/app/ui";

import {
	AudioLines,
	FileQuestion,
	Play,
	Scale,
	UploadCloudIcon,
	User,
	User2,
} from "lucide-react-native";
import { useState } from "react";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";
import { cn } from "../../lib/utils";
import { useMediaQuery } from "../../ui/primitives/hooks";
import ShareDialogContent from "../dialogs/share";
import { TrackDialogContent } from "../dialogs/track";

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
	const { login, logout, authenticated, ready, user } = usePrivy();

	const disableLogin = !ready || (ready && authenticated);

	const submitButtonHandler = () => {
		if (disableLogin) return;

		login();
	};

	const connectButtonHandler = () => {
		if (disableLogin) {
			return logout();
		}

		login();
	};

	return (
		<View className="h-full w-full items-center p-6">
			<View className="fixed inset-x-0 top-0 w-full px-6 pt-6 pb-2 bg-white items-center z-10">
				<Row className="max-w-2xl w-full bg-primary rounded-full px-4 py-3 flex justify-between items-center">
					<Link href={"/"}>
						<SolitoImage
							src="/logo.png"
							height={29.46}
							width={48}
							contentFit={"contain"}
							onLayout={{}}
							resizeMode={"cover"}
							alt="A cool image, imported locally."
						/>
					</Link>

					<Row className="gap-2">
						<Button
							variant={"ghost"}
							className="flex items-center gap-2"
							onPress={submitButtonHandler}
						>
							<UploadCloudIcon className="w-4" />
							Submit Mix
						</Button>
						<Button onPress={connectButtonHandler}>
							{authenticated ? "Disconnect" : "Connect"}
						</Button>
					</Row>
				</Row>
			</View>

			<View className="pb-24 pt-20 w-full max-w-2xl items-center">
				{children}
			</View>

			<View className="fixed inset-x-0 bottom-0 w-full gap-1 items-center px-6 py-2 bg-white">
				<Row className="max-w-2xl w-full bg-gradient-final border border-primary rounded-full px-8 py-3 flex justify-between items-center">
					<View>
						<Text className="font-bold">Mix Season</Text>
						<Text className="italic">Artist Name</Text>
					</View>

					<Row className="gap-2 items-center">
						<TrackDialog />

						<Text className="mb-0.5">0:00/30:24</Text>

						<Button variant={"ghost"} size={"icon"} className="h-auto w-auto">
							<Play className="w-[18px] h-[18px]" fill={"black"} />
						</Button>

						<Link
							href={`/profile/${user?.wallet?.address}`}
							className={buttonVariants({
								variant: "ghost",
								size: "icon",
								className: "h-auto w-auto",
							})}
						>
							<User className="w-[18px] h-[18px]" />
						</Link>
					</Row>
				</Row>

				<Row className="gap-1 items-center">
					<Button
						variant={"link"}
						className="gap-1 flex no-underline hover:underline"
					>
						<FileQuestion className="w-4 h-4 mt-0.5" />
						FAQ
					</Button>

					<Button
						variant={"link"}
						className="gap-1 flex no-underline hover:underline"
					>
						<Scale className="w-4 h-4 mt-0.5" />
						Legal
					</Button>

					<ShareDialog />
				</Row>
			</View>
		</View>
	);
}

function TrackDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant={"ghost"} size={"icon"} className="h-auto w-auto">
						<AudioLines className="w-[18px] h-[18px]" />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<TrackDialogContent />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Text
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"cursor-pointer h-auto w-auto",
					)}
				>
					<AudioLines className="w-[18px] h-[18px]" />
				</Text>
			</DrawerTrigger>
			<DrawerContent>
				<TrackDialogContent />
			</DrawerContent>
		</Drawer>
	);
}

function ShareDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={"link"}
						className="gap-1 flex no-underline hover:underline"
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
						Zora Bridge
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<ShareDialogContent />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Text
					className={cn(
						buttonVariants({ variant: "link" }),
						"cursor-pointer gap-1 flex no-underline hover:underline",
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
					Zora Bridge
				</Text>
			</DrawerTrigger>
			<DrawerContent>
				<ShareDialogContent />
			</DrawerContent>
		</Drawer>
	);
}
