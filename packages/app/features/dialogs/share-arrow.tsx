import { ArrowUpRight } from "lucide-react-native";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "../../ui";
import { useMediaQuery } from "../../ui/primitives/hooks";
import ShareDialogContent from "./share";

export function ShareDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<ArrowUpRight className="w-4 h-4 mt-1 text-primary z-50" />
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<ShareDialogContent />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<ArrowUpRight className="w-4 h-4 mt-1 text-primary z-50" />
			</DrawerTrigger>
			<DrawerContent>
				<ShareDialogContent />
			</DrawerContent>
		</Drawer>
	);
}
