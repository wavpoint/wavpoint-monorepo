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
	Progress,
	Row,
	Text,
	View,
	buttonVariants,
	useMediaQuery,
} from "@repo/app/ui";

import { usePrivy } from "@privy-io/react-auth";
import {
	cn,
	cookieName,
	getSupabase,
	mintCountQueryDocument,
	zdk,
} from "@repo/app/lib";
import { currentSongAtom, isPlayingAtom } from "@repo/app/store/player";
import { COLLECTION_ADDRESS, VINYL_GOAL, ipfsToUrl } from "@repo/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { ArrowUpRight, Play, PlayIcon } from "lucide-react-native";
import { useMemo, useState } from "react";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";
import MintDialogContent from "../../dialogs/mint";

const useMixParams = useParams<{ id: string }>;

export function MixScreen() {
	const { id } = useMixParams();
	const [currentSong, setCurrentSong] = useAtom(currentSongAtom);
	const setIsPlaying = useSetAtom(isPlayingAtom);
	const { authenticated } = usePrivy();

	const fetchToken = async () => {
		const data = await zdk.token({
			token: {
				address: COLLECTION_ADDRESS,
				tokenId: id,
			},
			includeFullDetails: true,
		});

		return data.token?.token;
	};

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

	const setAsCurrentSong = () => {
		if (
			data?.content?.url &&
			data.content.mimeType?.startsWith("audio") &&
			currentSong?.url !== data.content.url
		) {
			mutate();
			setCurrentSong({
				title: data.name ?? "",
				artist: "Artist Name",
				url: ipfsToUrl(data.content.url),
				duration: 0,
				cover: ipfsToUrl(data.image?.url),
			});

			setIsPlaying(true);
		}
	};

	const { data: mintData } = useQuery({
		queryKey: [`MINT_${id}`],
		queryFn: async () =>
			request("http://localhost:42069", mintCountQueryDocument, {
				tokenId: `${id}:${COLLECTION_ADDRESS}`,
			}),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});

	const { data } = useQuery({
		queryKey: [`TOKEN_${id}`],
		queryFn: fetchToken,
		enabled: !!id,
		refetchOnWindowFocus: false,
	});

	const supabase = useMemo(() => {
		const accessToken = Cookies.get(cookieName);
		return getSupabase(accessToken ?? "");
	}, []);

	const { data: playsData } = useQuery({
		queryKey: [`TOKEN_PLAYS_${id}`],
		queryFn: async () =>
			await supabase
				?.from("plays")
				.select<string, { plays: number }>("plays")
				.eq("token_id", id)
				.eq("collection_address", COLLECTION_ADDRESS)
				.limit(1),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});

	return (
		<View className="max-w-xl items-center gap-2 flex-1 w-full">
			<View className="relative w-[200px] h-[200px] bg-gradient-initial rounded-md flex items-center justify-center mt-2">
				<img
					src={ipfsToUrl(data?.image?.url)}
					width={"100%"}
					height={"100%"}
					alt=""
					className="absolute inset-0 rounded-md"
				/>
				{currentSong?.url !== ipfsToUrl(data?.content?.url) && (
					<View
						onClick={setAsCurrentSong}
						className="backdrop-blur opacity-0 cursor-pointer inset-0 absolute justify-center items-center hover:opacity-100 transition-opacity"
					>
						<PlayIcon className="w-8 h-8" fill={"black"} />
					</View>
				)}
			</View>

			<Row className="px-0 items-center w-[200px]">
				<Text className="text-sm font-bold underline overflow-hidden grow whitespace-nowrap relative">
					{data?.name}
					<View className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white pointer-events-none" />
				</Text>

				<ArrowUpRight className="w-4 h-4 mt-1 text-primary basis-4 shrink-0" />
			</Row>

			<View className="w-[200px] items-center">
				<Row className="w-full">
					<Text className="text-[10px] w-1/2 pl-3">0</Text>
					{/* FIXME: UNCOMMENT FOR DOWNLOADS GOAL and change widths from 1/2 to 1/3 */}
					{/* <Text className="text-[10px] w-1/3 text-center">1,111</Text> */}
					<Text className="text-[10px] text-end w-1/2 pr-1">{VINYL_GOAL}</Text>
				</Row>
				{mintData?.mintCount?.mintCount && (
					<Progress
						value={mintData.mintCount.mintCount}
						max={VINYL_GOAL}
						className="w-11/12"
					/>
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
					<Text className="text-xs">{playsData?.data?.[0]?.plays ?? 0}</Text>
				</Row>
				<Row className="items-center gap-0.5">
					<EthLogo className="w-3 h-3" />
					<Text className="text-xs text-primary">1 ETH</Text>
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
