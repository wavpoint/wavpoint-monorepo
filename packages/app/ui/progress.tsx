import { VINYL_GOAL } from "@wavpoint/utils";
import * as React from "react";
import { Platform } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";
import { cn } from "../lib/utils";
import * as ProgressPrimitive from "./primitives/progress";
import { Text } from "./typography";

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				"relative h-4 w-full overflow-hidden rounded-full bg-gradient-initial",
				className,
			)}
			{...props}
		>
			<Indicator value={value} />
		</ProgressPrimitive.Root>
	);
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({ value }: { value: number | undefined | null }) {
	const progress = useDerivedValue(() => value ?? 0, [value]);

	function getVisualProgress(currentValue: number) {
		// FIXME: Uncomment to enable downloads goal
		// if (currentValue <= 1111) {
		// 	// Interpolate from 0 to 1111 to map to 0% to 50%
		// 	return interpolate(currentValue, [0, 1111], [0, 50], Extrapolation.CLAMP);
		// }

		// Interpolate from 1111 to VINYL_GOAL to map to 50% to 100%
		return interpolate(
			currentValue,
			// FIXME: Replace the two arrays to enable downloads goal
			// [1111, VINYL_GOAL],
			// [50, 100],
			[0, VINYL_GOAL],
			[0, 100],
			Extrapolation.CLAMP,
		);
	}

	const indicator = useAnimatedStyle(() => {
		return {
			width: withSpring(
				`${interpolate(
					progress.value,
					[0, VINYL_GOAL],
					[0, 100],
					Extrapolation.CLAMP,
				)}%`,
				{ overshootClamping: true },
			),
		};
	}, [progress.value]);

	if (Platform.OS === "web") {
		return (
			<>
				<ProgressPrimitive.Indicator
					className="h-full w-full flex-1 bg-primary web:transition-all rounded-r-full"
					style={{
						transform: `translateX(-${
							100 - getVisualProgress(progress.value)
						}%)`,
					}}
				/>
				{progress.value > VINYL_GOAL / 11 && (
					<Text
						className="absolute flex items-center justify-end w-full text-[8px] h-full pr-1 italic -mt-[1px]"
						style={{
							transform: `translateX(-${
								100 - getVisualProgress(progress.value)
							}%)`,
						}}
					>
						{progress.value.toLocaleString()}
					</Text>
				)}
			</>
		);
	}

	return (
		<ProgressPrimitive.Indicator asChild>
			{progress.value > VINYL_GOAL / 11 && (
				<Text
					className="absolute flex items-center justify-end w-full text-[8px] h-full pr-1 italic -mt-[1px]"
					style={{
						transform: `translateX(-${
							100 - getVisualProgress(progress.value)
						}%)`,
					}}
				>
					{progress.value.toLocaleString()}
				</Text>
			)}
			<Animated.View style={indicator} className={cn("h-full bg-foreground")} />
		</ProgressPrimitive.Indicator>
	);
}
