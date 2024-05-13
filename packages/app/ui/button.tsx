import { type VariantProps, cva } from "class-variance-authority";
import { styled } from "nativewind";
import * as React from "react";
import { Pressable as RNPressable } from "react-native";
import { cn } from "../lib/utils";
import * as Slot from "./primitives/slot";
import { Text } from "./typography";

export const Pressable = styled(RNPressable);

const buttonVariants = cva(
	"group flex items-center justify-center rounded-full web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-black web:hover:bg-black/80 active:bg-black/80",
				destructive: "bg-destructive web:hover:opacity-80 active:opacity-80",
				outline:
					"border border-black web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
				secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
				ghost:
					"web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
				link: "web:underline-offset-4 web:hover:underline web:focus:underline",
			},
			size: {
				default: "px-4 py-2",
				sm: "py-1 px-2",
				lg: "h-11 rounded-md px-8 native:h-14",
				icon: "h-8 w-8",
				wide: "px-6 py-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const buttonTextVariants = cva(
	"web:whitespace-nowrap text-sm web:transition-colors",
	{
		variants: {
			variant: {
				default: "text-white",
				destructive: "text-destructive-foreground",
				outline: "group-active:text-accent-foreground",
				secondary:
					"text-secondary-foreground group-active:text-secondary-foreground",
				ghost: "text-black group-active:text-black",
				link: "underline",
			},
			size: {
				default: "",
				sm: "text-xs",
				lg: "native:text-lg",
				wide: "",
				icon: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
	React.ElementRef<typeof Pressable>,
	ButtonProps
>(({ children, className, variant, size, ...props }, ref) => {
	return (
		<Slot.Pressable
			className={cn(
				props.disabled && "opacity-50 web:pointer-events-none",
				buttonVariants({ variant, size, className }),
			)}
			ref={ref}
			role="button"
			{...props}
		>
			<Text className={buttonTextVariants({ variant, size, className })}>
				{children as React.ReactNode}
			</Text>
		</Slot.Pressable>
	);
});
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
