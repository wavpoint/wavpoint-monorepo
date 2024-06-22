"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	EthLogo,
	Pressable,
	Progress,
	Row,
	Text,
	View,
	buttonVariants,
	useMediaQuery,
} from "@wavpoint/app/ui";

import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMintData } from "@wavpoint/app/gql";
import { useIpfsUrl, useSupabase } from "@wavpoint/app/hooks";
import { cn, fetchToken } from "@wavpoint/app/lib";
import {
	currentSongAtom,
	isPlayingAtom,
	useOverrideCurrentlyPlayingListener,
} from "@wavpoint/app/store/player";
import {
	COLLECTION_ADDRESS,
	CREATOR_REWARDS_ETH,
	VINYL_GOAL,
} from "@wavpoint/utils";
import { useAtom, useSetAtom } from "jotai";
import { Play, PlayIcon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";
import MintDialogContent from "../../dialogs/mint";
import { ShareDialog } from "../../dialogs/share-arrow";

const useMixParams = useParams<{ id: string }>;

export function MixScreen() {
	const { id } = useMixParams();

	const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
	const setIsPlaying = useSetAtom(isPlayingAtom);

	const { authenticated } = usePrivy();
	const supabase = useSupabase();

	const { data } = useQuery({
		queryKey: [`TOKEN_${id}`],
		queryFn: () => fetchToken(id),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});

	const contentUrl = useIpfsUrl(data?.content?.url);
	const imageUrl = useIpfsUrl(data?.image?.url);

	const { mutate } = useMutation({
		mutationFn: async () => {
			if (!authenticated) return;

			const res = await fetch("/api/play", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tokenId: id,
				}),
			});

			return res.status;
		},
	});

	const setAsCurrentSong = useCallback(() => {
		if (
			data?.content?.url &&
			data.content.mimeType?.startsWith("audio") &&
			currentSong?.url !== data.content.url // Song isn't currently playing
		) {
			mutate();
			setCurrentSong({
				title: data.name ?? "",
				artist: "Artist Name",
				url: contentUrl,
				duration: 0,
				cover: imageUrl,
			});

			setIsPlaying(true);
		}
	}, [
		data?.content?.url,
		data?.content?.mimeType,
		currentSong,
		contentUrl,
		data?.name,
		imageUrl,
		mutate,
		setCurrentSong,
		setIsPlaying,
	]);

	const { data: mintCount } = useQuery({
		queryKey: [`MINT_${id}`],
		queryFn: () => fetchMintData(id),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});

	const { data: playsData } = useQuery({
		queryKey: [`TOKEN_PLAYS_${id}`],
		queryFn: async () => {
			const res = await supabase
				?.from("plays")
				.select<string, { plays: number }>("plays")
				.eq("token_id", id)
				.eq("collection_address", COLLECTION_ADDRESS)
				.limit(1);

			return res?.data?.[0]?.plays;
		},
		enabled: !!id && !!supabase,
		refetchOnWindowFocus: false,
	});

	const creatorRewards = useMemo(() => {
		return ((mintCount ?? 0) * CREATOR_REWARDS_ETH).toFixed(3);
	}, [mintCount]);

	useOverrideCurrentlyPlayingListener(
		useCallback(() => {
			setAsCurrentSong();
		}, [setAsCurrentSong]),
	);

	return (
		<View className="max-w-xl items-center gap-2 flex-1 w-full">
			<View className="relative w-[200px] h-[200px] bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md flex items-center justify-center mt-2">
				{data?.image && (
					<SolitoImage
						src={imageUrl}
						onLayout={{}}
						contentFit={"cover"}
						resizeMode={"cover"}
						width={200}
						height={200}
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
				)}
				{currentSong?.url !== contentUrl && (
					<Pressable
						onPress={setAsCurrentSong}
						className="backdrop-blur cursor-pointer inset-0 absolute justify-center items-center rounded-md"
					>
						<PlayIcon className="w-8 h-8" fill={"black"} />
					</Pressable>
				)}
			</View>

			<Row className="px-0 items-center w-[200px]">
				<Text className="text-sm font-bold underline overflow-hidden grow whitespace-nowrap relative">
					{data?.name}
					<View className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white pointer-events-none" />
				</Text>

				<ShareDialog tokenId={id} />
			</Row>

			<View className="w-[200px] items-center">
				<Row className="w-full">
					<Text className="text-[10px] w-1/2 pl-3">0</Text>
					{/* FIXME: UNCOMMENT FOR DOWNLOADS GOAL and change widths from 1/2 to 1/3 */}
					{/* <Text className="text-[10px] w-1/3 text-center">1,111</Text> */}
					<Text className="text-[10px] text-end w-1/2 pr-1">{VINYL_GOAL}</Text>
				</Row>
				{mintCount && (
					<Progress value={mintCount} max={VINYL_GOAL} className="w-11/12" />
				)}
				<Row className="w-full">
					<Text className="text-[10px] w-1/2">Onchain</Text>
					{/* FIXME: UNCOMMENT FOR DOWNLOADS GOAL and change widths from 1/2 to 1/3 */}
					{/* <Text className="text-[10px] w-1/3 text-center">Downloads</Text> */}
					<Text className="text-[10px] w-1/2 text-end pr-2">Vinyl</Text>
				</Row>
			</View>

			<MintDialog />

			<Row className="gap-3">
				<Row className="items-center gap-0.5">
					<Play className="fill-black w-2.5 h-2.5" />
					<Text className="text-xs">{playsData ?? 0}</Text>
				</Row>
				<Row className="items-center gap-0.5">
					<EthLogo className="w-3 h-3" />
					<Text className="text-xs text-primary">
						{mintCount ? creatorRewards : 0} ETH
					</Text>
				</Row>
			</Row>

			<View className="w-full mt-8 gap-3">
				{Array.from({ length: 10 }).map((_, i) => (
					<View key={`${i * 2}`} className="w-full">
						<Text className="text-sm font-semibold">Track ID</Text>
						<Text className="text-xs italic font-extralight">Artist Name</Text>
					</View>
				))}
			</View>
		</View>
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
						size={"wide"}
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
						buttonVariants({ variant: "outline", size: "wide" }),
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
