import { zodResolver } from "@hookform/resolvers/zod";
import { useWallets } from "@privy-io/react-auth";
import {
	chain,
	cn,
	getWalletClient,
	handleContractErrors,
	mintCountQueryDocument,
	publicClient,
} from "@repo/app/lib";
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
	Slider,
	Text,
	View,
	buttonVariants,
	useMediaQuery,
} from "@repo/app/ui";
import {
	COLLECTION_ADDRESS,
	MAX_MINT_AMOUNT,
	TOKEN_PRICE_ETH,
	VINYL_GOAL,
} from "@repo/utils";
import { useQuery } from "@tanstack/react-query";
import { createMintClient } from "@zoralabs/protocol-sdk";
import request from "graphql-request";
import { Disc3 } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";
import { z } from "zod";
import ClaimDialogContent from "./claim";

const mintFormSchema = z.object({
	comment: z.string().max(128),
});
type MintFormInput = z.infer<typeof mintFormSchema>;

export default function MintDialogContent() {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver<typeof mintFormSchema>(mintFormSchema),
		defaultValues: {
			comment: "",
		},
	});

	const params = useParams();
	// FIXME: Uncomment to enable downloads
	// const router = useRouter();

	const { wallets, ready } = useWallets();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const wallet = wallets[0];

		if (!wallet || wallet.chainId === chain.id.toString()) return;

		wallet.switchChain(chain.id);
	}, [ready]);

	const [value, setValue] = useState(1);

	const fetchEthPrice = async () => {
		const res = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot");

		const resJson: {
			data: { amount: number; base: string; currency: string };
		} = await res.json();

		return resJson.data.amount;
	};

	const { data: ethPrice } = useQuery({
		queryKey: ["ETH_PRICE"],
		queryFn: fetchEthPrice,
	});

	const { data: mintData } = useQuery({
		queryKey: [`MINT_${params.id}`],
		queryFn: async () =>
			request(
				process.env.NEXT_PUBLIC_INDEXER_URI ?? "http://localhost:42069",
				mintCountQueryDocument,
				{
					tokenId: `${params.id}:${COLLECTION_ADDRESS}`,
				},
			),
		enabled: !!params.id,
	});

	// FIXME: Uncomment to enable downloads
	// const supabase = useMemo(() => {
	// 	const accessToken = Cookies.get(cookieName);
	// 	return getSupabase(accessToken ?? "");
	// }, []);

	// const { refetch, isLoading } = useQuery({
	// 	queryKey: ["supabase"],
	// 	queryFn: async () => {
	// 		const content = await supabase.storage.from("content").download("3.zip");

	// 		const url = content.data && URL.createObjectURL(content.data);

	// 		url && router.push(url);

	// 		return;
	// 	},
	// 	enabled: false,
	// });

	// const {} = usePrepareContractWrite({

	// })

	const walletClient = useMemo(() => {
		return getWalletClient();
	}, []);

	const handleMint = async (input: MintFormInput) => {
		if (!wallets[0]?.address) return;

		const address = wallets[0].address as `0x${string}`;

		try {
			const mintClient = createMintClient({ chain });

			// prepare the mint transaction, which can be simulated via an rpc with the public client.
			const prepared = await mintClient.makePrepareMintTokenParams({
				// 1155 contract address
				tokenAddress: COLLECTION_ADDRESS,
				tokenId: BigInt(params.id as string),
				mintArguments: {
					// address that will receive the minted tokens
					mintToAddress: address,
					// quantity of tokens to mint
					quantityToMint: value,
					// optional comment to include with the mint
					mintComment: input.comment,
					// optional address that will receive a mint referral reward
				},
				// account that is to invoke the mint transaction
				minterAccount: address,
			});

			// simulate the transaction
			const { request } = await publicClient.simulateContract({
				...prepared,
			});

			const hash = await walletClient.writeContract(request);

			const receipt = await publicClient.waitForTransactionReceipt({ hash });

			if (receipt.status !== "success") {
				console.error("Transaction failed", receipt);
			} else {
				reset();
			}
		} catch (error) {
			await handleContractErrors(error, wallets);
		}
	};

	// FIXME: Uncomment to enable downloads
	// const handleDownload = () => refetch();

	return (
		<Row className="flex justify-center">
			<View className="px-8 py-4 gap-4 max-w-xl w-full">
				<View>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Comment"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
						)}
						name="comment"
					/>

					{errors.comment && (
						<Text className="text-red-600 mt-1">{errors.comment?.message}</Text>
					)}
				</View>

				<View>
					<Slider
						value={value}
						min={1}
						max={MAX_MINT_AMOUNT}
						onValueChange={(vals) => {
							const nextValue = vals[0];
							if (typeof nextValue !== "number") return;
							setValue(nextValue);
						}}
					/>
					<Row className="w-full flex justify-between">
						<Text className="text-xs">QTY: {value}</Text>
						<Text className="text-xs">
							{value * TOKEN_PRICE_ETH} ETH (≈$
							{((ethPrice ?? 0) * value * TOKEN_PRICE_ETH).toFixed(2)} USD)
						</Text>
					</Row>
				</View>
				<Button
					variant="outline"
					className="border-primary text-primary font-semibold gap-2"
					onPress={handleSubmit(handleMint)}
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
						onPress={() => setValue(MAX_MINT_AMOUNT)}
					>
						MAX
					</Button>
				</Row>
				<View className="flex items-center gap-2">
					{/* FIXME: Uncomment to enable downloads */}
					{/* <Text className="text-sm">
						Collect <Text className="text-primary text-sm">3+</Text> to download
						IDs
					</Text> */}
					<Text className="text-sm">
						Collect <Text className="text-primary text-sm">{VINYL_GOAL}+</Text>{" "}
						to be eligible to claim vinyl
					</Text>
				</View>

				<Row className="justify-center gap-1">
					{/* FIXME: Uncomment to enable downloads */}
					{/* <Button
						variant="ghost"
						className="gap-1 text-gray-400 text-xs"
						onPress={handleDownload}
						disabled={isLoading}
					>
						<Download className="w-4 h-4" />
						Download IDs
					</Button> */}

					{(mintData?.mintCount?.mintCount ?? 0) >= VINYL_GOAL && (
						<ClaimDialog />
					)}
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
