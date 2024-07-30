import * as TabsPrimitive from "@radix-ui/react-tabs";
import { styled } from "nativewind";
import * as React from "react";
import { cn } from "../lib";
import { Root, useRootContext } from "./primitives/tabs";
import { TextClassContext } from "./text";

const Tabs = Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn("web:inline-flex h-10 native:h-12 items-center", className)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
	const { value } = useRootContext();
	return (
		<TextClassContext.Provider
			value={cn(
				"text-sm native:text-base font-medium text-muted-foreground web:transition-all",
				value === props.value && "text-foreground",
			)}
		>
			<TabsPrimitive.Trigger
				ref={ref}
				className={cn(
					"border-b-2 border-white inline-flex items-center justify-center shadow-none web:whitespace-nowrap py-1.5 text-sm font-medium web:ring-offset-background web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
					props.disabled && "web:pointer-events-none opacity-50",
					props.value === value && " border-primary",
					className,
				)}
				{...props}
			/>
		</TextClassContext.Provider>
	);
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
