import { zodResolver } from "@hookform/resolvers/zod";
import { useWallets } from "@privy-io/react-auth";
import { fetchMintData } from "@wavpoint/app/gql";
import {
	chain,
	cn,
	getWalletClient,
	handleContractErrors,
	publicClient,
} from "@wavpoint/app/lib";
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
} from "@wavpoint/app/ui";
import {
	COLLECTION_ADDRESS,
	MAX_MINT_AMOUNT,
	TOKEN_PRICE_ETH,
	VINYL_GOAL,
} from "@wavpoint/utils";
import { useQuery } from "@tanstack/react-query";
import { createMintClient } from "@zoralabs/protocol-sdk";
import { Disc3, Loader2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SolitoImage } from "solito/image";
import { useParams } from "solito/navigation";
import { z } from "zod";
import ClaimDialogContent from "./claim";

const mintFormSchema = z.object({
	comment: z.string().max(128),
});
type MintFormInput = z.infer<typeof mintFormSchema>;

export default function MintDialogContent() {
	const [mintLoading, setMintLoading] = useState(false);
	const [quantityToMint, setQuantityToMint] = useState(1);

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

	const { wallets } = useWallets();

	useEffect(() => {
		const wallet = wallets[0];

		if (!wallet || wallet.chainId === chain.id.toString()) return;

		wallet.switchChain(chain.id);
	}, [wallets[0]]);

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

	const { data: mintCount } = useQuery({
		queryKey: [`MINT_${params.id}`],
		queryFn: () => fetchMintData(params.id?.toString() ?? ""),
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

	const handleMint = async (input: MintFormInput) => {
		setMintLoading(true);

		if (!wallets[0]?.address) {
			setMintLoading(false);
			toast.error("Please log into your wallet!");
			return;
		}

		const address = wallets[0].address as `0x${string}`;

		try {
			const mintClient = createMintClient({ chain, publicClient });

			// prepare the mint transaction, which can be simulated via an rpc with the public client.
			const prepared = await mintClient.makePrepareMintTokenParams({
				// 1155 contract address
				tokenAddress: COLLECTION_ADDRESS,
				tokenId: BigInt(params.id as string),
				mintArguments: {
					// address that will receive the minted tokens
					mintToAddress: address,
					// quantity of tokens to mint
					quantityToMint,
					// optional comment to include with the mint
					mintComment: input.comment,
					// TODO: address that will receive a mint referral reward
				},
				// account that is to invoke the mint transaction
				minterAccount: address,
			});

			// simulate the transaction
			const { request } = await publicClient.simulateContract({
				...prepared,
			});

			const client = await getWalletClient(wallets[0]);

			const hash = await client.writeContract(request);

			const receipt = await publicClient.waitForTransactionReceipt({ hash });

			if (receipt.status !== "success") {
				console.error(receipt);
				toast.error("Transaction failed! Check console for receipt.");
			} else {
				reset();
				toast.success("Successfully minted!");
			}
		} catch (error) {
			await handleContractErrors(error, wallets);
		}

		setMintLoading(false);
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
						disabled={mintLoading}
						value={quantityToMint}
						min={1}
						max={MAX_MINT_AMOUNT}
						onValueChange={(vals) => {
							const nextValue = vals[0];
							if (typeof nextValue !== "number") return;
							setQuantityToMint(nextValue);
						}}
					/>
					<Row className="w-full flex justify-between">
						<Text className="text-xs">QTY: {quantityToMint}</Text>
						<Text className="text-xs">
							{quantityToMint * TOKEN_PRICE_ETH} ETH (≈$
							{((ethPrice ?? 0) * quantityToMint * TOKEN_PRICE_ETH).toFixed(2)}{" "}
							USD)
						</Text>
					</Row>
				</View>
				<Button
					variant="outline"
					className="border-primary text-primary font-semibold gap-2"
					onPress={handleSubmit(handleMint)}
					disabled={mintLoading}
				>
					{mintLoading ? (
						<View className="animate-spin">
							<Loader2 className="text-primary w-[14px] h-[14px]" />
						</View>
					) : (
						<SolitoImage
							src="/zorb.png"
							height={14}
							width={14}
							contentFit={"contain"}
							onLayout={{}}
							resizeMode={"cover"}
							alt="A cool image, imported locally."
						/>
					)}
					Mint +
				</Button>

				<Row className="gap-6 justify-center w-full">
					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setQuantityToMint(3)}
						disabled={mintLoading}
					>
						3
					</Button>

					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setQuantityToMint(20)}
						disabled={mintLoading}
					>
						20
					</Button>

					<Button
						variant={"outline"}
						className="border-primary text-primary font-semibold w-20"
						onPress={() => setQuantityToMint(MAX_MINT_AMOUNT)}
						disabled={mintLoading}
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

					{(mintCount ?? 0) >= VINYL_GOAL && <ClaimDialog />}
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
