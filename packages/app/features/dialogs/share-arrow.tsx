import {
	Dialog,
	DialogContent,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	useMediaQuery,
} from "@wavpoint/app/ui";
import { ArrowUpRight } from "lucide-react-native";
import { useState } from "react";
import ShareDialogContent from "./share";

interface ShareDialogProps {
	tokenId: string;
}

export function ShareDialog({ tokenId }: ShareDialogProps) {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 624px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<ArrowUpRight className="w-4 h-4 mt-1 text-primary z-50" />
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<ShareDialogContent tokenId={tokenId} />
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
				<ShareDialogContent tokenId={tokenId} />
			</DrawerContent>
		</Drawer>
	);
}
