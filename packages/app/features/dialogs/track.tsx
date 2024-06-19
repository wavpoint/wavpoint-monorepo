import { cn } from "@repo/app/lib";
import {
	audioRefAtom,
	currentSongAtom,
	currentSongElapsedTimeAtom,
	isPlayingAtom,
} from "@repo/app/store/player";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	Row,
	Slider2,
	Text,
	View,
	buttonVariants,
	useMediaQuery,
} from "@repo/app/ui";
import { formatTime } from "@repo/utils";
import { useAtom, useAtomValue } from "jotai";
import { debounce } from "lodash";
import {
	ArrowUpRight,
	Play,
	PlusCircle,
	SkipBack,
	SkipForward,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { SolitoImage } from "solito/image";
import MintDialogContent from "./mint";

export function TrackDialogContent() {
	const currentSong = useAtomValue(currentSongAtom);
	const currentSongElapsedTime = useAtomValue(currentSongElapsedTimeAtom);
	const audioRefState = useAtomValue(audioRefAtom);
	const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

	const handleTogglePlay = () => setIsPlaying((prev) => !prev);

	const [sliderValue, setSliderValue] = useState(currentSongElapsedTime);

	useEffect(() => {
		setSliderValue(currentSongElapsedTime);
	}, [currentSongElapsedTime]);

	const debouncedUpdateTime = useCallback(
		debounce((nextValue) => {
			if (typeof nextValue !== "number" || !audioRefState?.current) return;

			audioRefState.current.currentTime = nextValue;
		}, 200),
		[],
	);

	const onSliderChange = (vals: number[]) => {
		const nextValue = vals[0];
		if (!nextValue) return;
		setSliderValue(nextValue);
		debouncedUpdateTime(nextValue);
	};

	return (
		<Row className="flex justify-center">
			<Row className="px-8 py-2 max-w-xl gap-4">
				<View className="w-[150px] h-[150px] bg-gradient-initial rounded-lg relative">
					<SolitoImage
						src={currentSong?.cover ?? ""}
						onLayout={{}}
						contentFit={"cover"}
						resizeMode={"cover"}
						width={150}
						height={150}
						alt={currentSong?.title ?? "Mix Cover"}
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							borderRadius: 6,
						}}
					/>
				</View>

				<View className="gap-4 justify-center max-w-44">
					<View className="gap-1">
						<Row>
							<Text className="flex items-center font-semibold truncate">
								{currentSong?.title ?? "Nothing Playing"}
							</Text>
							<ArrowUpRight className="w-4 h-4 text-primary mt-0.5 basis-4 shrink-0" />
						</Row>
						<Text className="font-extralight italic text-xs">
							{currentSong?.artist ?? "Nothing Playing"}
						</Text>
					</View>

					<View className="gap-1.5">
						<Slider2
							value={sliderValue}
							max={currentSong?.duration}
							onValueChange={onSliderChange}
						/>

						<Row className="justify-between">
							<Text className="text-[10px]">
								{formatTime(currentSongElapsedTime)}
							</Text>
							<Text className="text-[10px]">
								{formatTime(currentSong?.duration)}
							</Text>
						</Row>
					</View>

					<Row className="justify-between">
						<Button
							size={"icon"}
							variant={"ghost"}
							className="rounded-lg"
							onPress={() => {
								if (audioRefState?.current)
									audioRefState.current.currentTime = 0;
							}}
						>
							<SkipBack className="w-5 h-5" />
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							className="rounded-lg"
							onPress={handleTogglePlay}
						>
							{isPlaying ? (
								<Row className="w-6 h-[18px] justify-evenly">
									<View className="w-1.5 h-full bg-black" />
									<View className="w-1.5 h-full bg-black" />
								</Row>
							) : (
								<Play className="w-6 h-6" fill={"black"} />
							)}
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							className="rounded-lg"
							onPress={() => {
								if (audioRefState?.current && currentSong)
									audioRefState.current.currentTime = currentSong.duration - 1;
							}}
						>
							<SkipForward className="w-5 h-5" />
						</Button>

						<MintDialog />
					</Row>
				</View>
			</Row>
		</Row>
	);
}

export function MintDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size={"icon"} variant={"ghost"} className="rounded-lg">
						<PlusCircle className="w-5 h-5 text-primary" />
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
						buttonVariants({ variant: "ghost", size: "icon" }),
						"cursor-pointer rounded-lg",
					)}
				>
					<PlusCircle className="w-5 h-5 text-primary" />
				</Text>
			</DrawerTrigger>
			<DrawerContent>
				<MintDialogContent />
			</DrawerContent>
		</Drawer>
	);
}
