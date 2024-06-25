import { WavpointAPIError } from "@wavpoint/utils";
import * as Burnt from "burnt";

export const handleWavpointApiErrors = (error: unknown) => {
	if (error instanceof WavpointAPIError) {
		error.zodErrors?.map((zodError) =>
			Burnt.toast({
				title: zodError.message,
				haptic: "error",
				preset: "error",
			}),
		);

		error.errors.map((error) => {
			Burnt.toast({ title: error.message, haptic: "error", preset: "error" });
		});

		return;
	}
	console.error(error);
	Burnt.toast({
		title: "Something went wrong!",
		haptic: "error",
		preset: "error",
	});
};
