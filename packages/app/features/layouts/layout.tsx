"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
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
	useMediaQuery,
} from "@wavpoint/app/ui";

import { cn, cookieName } from "@wavpoint/app/lib";
import {
	audioRefAtom,
	currentSongAtom,
	currentSongElapsedTimeAtom,
	isPlayingAtom,
	overrideCurrentlyPlaying,
	useIsPlayingListener,
} from "@wavpoint/app/store/player";
import { formatTime } from "@wavpoint/utils";
import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import {
	AudioLines,
	FileQuestion,
	Play,
	Scale,
	UploadCloudIcon,
	User,
} from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { SolitoImage } from "solito/image";
import { Link } from "solito/link";
import { TrackDialogContent } from "../dialogs/track";

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
	const { logout, authenticated, ready, user, getAccessToken } = usePrivy();

	const { login } = useLogin({
		async onComplete(_, __, wasAlreadyAuthenticated) {
			if (wasAlreadyAuthenticated) {
				const cookie = Cookies.get(cookieName);
				if (cookie) return;
			}
			await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					accessToken: await getAccessToken(),
				}),
			});
		},
	});

	const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
	const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
	const [currentSongElapsedTime, setCurrentSongElapsedTime] = useAtom(
		currentSongElapsedTimeAtom,
	);
	const setAudioRefState = useSetAtom(audioRefAtom);
	const setOverrideCurrentlyPlaying = useSetAtom(overrideCurrentlyPlaying);

	const [updateAudioRef, setUpdateAudioRef] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const disableLogin = !ready || (ready && authenticated);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setAudioRefState(audioRef);
	}, [audioRef]);

	// TODO: Don't use this hacky solution
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const update = async () => {
			if (updateAudioRef && audioRef.current?.isConnected) {
				isPlaying ? await audioRef.current?.play() : audioRef.current?.pause();

				setUpdateAudioRef(false);
			}
		};

		update();
	}, [updateAudioRef]);

	useIsPlayingListener(
		useCallback(async (g, s, prev, curr) => {
			setUpdateAudioRef(true);
		}, []),
	);

	const handleLogout = useCallback(async () => {
		// clear both Privy and supabase session
		await logout();
		await fetch("/api/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}, [logout]);

	const submitButtonHandler = () => {
		if (disableLogin) return;

		login();
	};

	const connectButtonHandler = () => {
		if (disableLogin) {
			return handleLogout();
		}

		login();
	};

	const handleTogglePlay = () => {
		if (currentSong) setIsPlaying(!isPlaying);
		else setOverrideCurrentlyPlaying(true);
	};

	const handleSongEnd = () => {
		setIsPlaying(false);
	};

	return (
		<View className="h-full w-full items-center p-6 has-[.loading]:max-h-screen has-[.loading]:overflow-hidden">
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
							alt="Wavpoint Logo"
							priority
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
				<Row className="max-w-2xl w-full bg-gradient-final border border-primary rounded-full px-8 py-3 flex justify-between items-center gap-2">
					<View
						className={cn(
							"shrink w-full h-[38px]",
							!currentSong?.artist && "justify-center",
						)}
					>
						<Text className={"font-bold truncate"}>
							{currentSong?.title ?? "Mix Name"}
						</Text>

						{currentSong?.artist && (
							<Text className={"italic truncate"}>{currentSong.artist}</Text>
						)}
					</View>

					<Row className="gap-2 items-center">
						{currentSong && <TrackDialog />}

						<Text className="mb-0.5">
							{formatTime(currentSongElapsedTime)}/
							{formatTime(audioRef.current?.duration)}
						</Text>

						<Button
							variant={"ghost"}
							size={"icon"}
							className="h-auto w-auto"
							onPress={handleTogglePlay}
						>
							{currentSong && (
								// biome-ignore lint/a11y/useMediaCaption: <explanation>
								<audio
									src={currentSong.url}
									className="hidden"
									ref={audioRef}
									onDurationChange={(e) =>
										setCurrentSong({
											...currentSong,
											duration: e.currentTarget.duration,
										})
									}
									onEnded={handleSongEnd}
									onTimeUpdate={(e) =>
										setCurrentSongElapsedTime(
											Math.floor(e.currentTarget.currentTime),
										)
									}
								/>
							)}
							{isPlaying ? (
								<Row className="w-[18px] h-[16px] justify-evenly">
									<View className="w-1 h-full bg-black" />
									<View className="w-1 h-full bg-black" />
								</Row>
							) : (
								<Play className="w-[18px] h-[18px]" fill={"black"} />
							)}
						</Button>

						{user?.wallet && (
							<Link
								href={`/profile/${user.wallet.address}`}
								className={buttonVariants({
									variant: "ghost",
									size: "icon",
									className: "h-auto w-auto",
								})}
							>
								<User className="w-[18px] h-[18px]" />
							</Link>
						)}
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

					<Link href={"https://bridge.zora.energy/"} target="_blank">
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
					</Link>
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
