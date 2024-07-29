import { useQuery } from "@tanstack/react-query";
import { handleWavpointApiErrors } from "@wavpoint/app/lib";
import { Button, Input, Row, Text, View } from "@wavpoint/app/ui";
import {
	COLLECTION_ADDRESS,
	type ClaimFormInput,
	VINYL_GOAL,
	WavpointAPIError,
} from "@wavpoint/utils";
import * as Burnt from "burnt";
import { ArrowUpRight, Clock, Loader2 } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "solito/navigation";
import { fetchTokenName } from "../../gql";
import { useSupabase, useTimer } from "../../hooks";
import { Skeleton } from "../../ui/skeleton";

export default function ClaimDialogContent() {
	const params = useParams();

	const supabase = useSupabase();

	const [claiming, setClaiming] = useState(false);

	useQuery({
		queryKey: [`COUNTDOWN_${params.id?.toString()}`],
		queryFn: async () => {
			const data = await supabase
				?.from("connections")
				.select("ends")
				.eq("minimix_address", COLLECTION_ADDRESS)
				.eq("minimix_token_id", params.id?.toString() ?? "")
				.single();

			if (data?.data?.ends) startTimer(new Date(data.data.ends));
		},
		enabled: !!params.id?.toString(),
	});

	const { countdown, startTimer } = useTimer();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ClaimFormInput>({
		defaultValues: {
			address: "",
			name: "",
			email: "",
			mixCollectionAddress: COLLECTION_ADDRESS,
			mixTokenId: params.id?.toString() ?? "",
		},
	});

	const { data, isLoading } = useQuery({
		queryKey: [`TOKEN_${params.id}`],
		queryFn: () => fetchTokenName(params.id?.toString() ?? ""),
		enabled: !!params.id?.toString(),
		refetchOnWindowFocus: false,
	});

	const handleClaim = async (values: ClaimFormInput) => {
		setClaiming(true);

		try {
			const res = await fetch("/api/claim", {
				body: JSON.stringify(values),
				method: "POST",
			});

			if (!res.ok) {
				setClaiming(false);

				const errorData = await res.json();

				if (errorData.type === "WavpointAPIError") {
					throw new WavpointAPIError(
						errorData.errors,
						errorData.status,
						errorData.zodErrors,
					);
				}
				throw new Error(errorData);
			}
			reset();
			Burnt.toast({
				title: "Successfully claimed vinyl!",
				haptic: "success",
				preset: "done",
			});

			setClaiming(false);
		} catch (error) {
			handleWavpointApiErrors(error);
		}
	};

	return (
		<Row className="flex justify-center">
			<View className="px-6 py-2 max-w-xl w-full items-center gap-4">
				<Skeleton show={isLoading} className="h-7 w-60">
					<Row className="gap-2">
						<Text className="font-bold text-xl underline underline-offset-4 gap-1 flex whitespace-nowrap overflow-hidden max-w-52">
							{data?.name}
							<View className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white pointer-events-none" />
						</Text>
						<ArrowUpRight className="w-6 h-6 text-primary mt-1" />
					</Row>
				</Skeleton>
				<Text className="text-xs italic">
					{VINYL_GOAL}+ tokens of season required to claim vinyl
				</Text>

				<View className="w-full">
					<Controller
						control={control}
						disabled={claiming}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Full name"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
						)}
						name="name"
					/>

					{errors.name && (
						<Text className="text-red-600 mt-1">{errors.name?.message}</Text>
					)}
				</View>

				<View className="w-full">
					<Controller
						control={control}
						disabled={claiming}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Email"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
						)}
						name="email"
					/>

					{errors.email && (
						<Text className="text-red-600 mt-1">{errors.email?.message}</Text>
					)}
				</View>

				<View className="w-full">
					<Controller
						control={control}
						disabled={claiming}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Address"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
							/>
						)}
						name="address"
					/>

					{errors.address && (
						<Text className="text-red-600 mt-1">{errors.address?.message}</Text>
					)}
				</View>

				<Button
					className="bg-primary web:hover:bg-primary/80 w-full gap-1"
					onPress={handleSubmit(handleClaim)}
					disabled={claiming}
				>
					{claiming && (
						<View className="animate-spin">
							<Loader2 className="w-[14px] h-[14px]" />
						</View>
					)}
					Submit
				</Button>

				<Row className="justify-center items-center gap-1">
					<Clock className="w-4 h-4 text-primary mt-0.5" />
					<Text className="font-semibold">
						{countdown.days !== "00" && `${countdown.days}:`}
						{countdown.hours}:{countdown.minutes}:{countdown.seconds}
					</Text>
				</Row>
			</View>
		</Row>
	);
}
