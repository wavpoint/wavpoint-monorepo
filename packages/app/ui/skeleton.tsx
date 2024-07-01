import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";
import { cn } from "../lib";
import { View } from "./view";

interface SkeletonProps extends ComponentPropsWithoutRef<typeof View> {
	show: boolean;
}

const Skeleton = forwardRef<
	ElementRef<typeof View>,
	SkeletonProps
	// @ts-ignore
>(({ className, children, show, ...props }, ref) => {
	if (show)
		return (
			<View
				ref={ref}
				className={cn(
					"flex-row bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md animate-pulse",
					className,
				)}
				{...props}
			>
				<View className="opacity-0 flex-row">{children}</View>
			</View>
		);

	return children;
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
