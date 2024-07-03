"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import * as SliderPrimitive from "./primitives/slider";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center",
			className,
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-9 w-full grow overflow-hidden rounded-xl bg-gray-200">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="cursor-grab active:cursor-grabbing block h-9 w-9 rounded-xl border border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

const Slider2 = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center justify-center",
			className,
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden bg-gray-200">
			<SliderPrimitive.Range className="absolute h-full bg-gradient-final" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="cursor-grab active:cursor-grabbing block rounded-full h-3 w-3 bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider2.displayName = SliderPrimitive.Root.displayName;

export { Slider, Slider2 };
