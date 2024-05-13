"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import { Button, H1, Row, Text, View } from "@repo/app/ui";

import {
	ArrowUpRight,
	Copy,
	Disc3,
	Download,
	Edit,
	Edit2,
	Edit3,
} from "lucide-react-native";
import { Link } from "solito/link";
import { ShareDialog } from "../dialogs/share-arrow";

export function ProfileScreen() {
	return (
		<DefaultLayout>
			<View className="max-w-xl flex-1 flex items-center w-full gap-8">
				<View className="items-center gap-2">
					<View className="w-20 h-20 rounded-full bg-gradient-final" />
					<Row className="items-center">
						<Text className="font-bold text-xl">Lootmatic</Text>
						<Edit3 className="w-4 h-4 ml-2 mt-1" />
					</Row>

					<Button variant={"link"} className="py-0 flex text-xs">
						0x...0000
						<Copy className="w-3 h-3 ml-2 mt-1" />
					</Button>

					<Text className="text-xs font-semibold mt-1">Collected Seasons</Text>
				</View>

				<View className="flex w-full gap-2 flex-row flex-wrap justify-evenly">
					{Array.from({ length: 10 }).map((_, i) => (
						<View key={`${i * 2}`} className="items-start gap-1">
							<Link href={`/mix/${String(i + 1).padStart(3, "0")}`}>
								<View className="w-[200px] h-[200px] flex justify-end bg-gradient-to-b from-gradient-initial to-gradient-final rounded-md p-2">
									<Row className="flex justify-between items-end">
										<Button variant={"outline"} size={"sm"}>
											111
										</Button>

										<Row className="gap-2 font-bold">
											<Button
												variant={"ghost"}
												size={"icon"}
												className="h-auto w-auto text-primary"
											>
												<Download className="w-4 h-4" />
											</Button>
											<Button
												variant={"ghost"}
												size={"icon"}
												className="h-auto w-auto"
											>
												<Disc3 className="w-4 h-4" />
											</Button>
										</Row>
									</Row>
								</View>
							</Link>

							<Row className="gap-0.5">
								<Link href={`/mix/${String(i + 1).padStart(3, "0")}`}>
									<Button
										variant={"link"}
										className="px-0 flex justify-between w-full items-center font-bold"
										size={"sm"}
									>
										S{String(i + 1).padStart(3, "0")} - Lootmatic & Trucalyptus
									</Button>
								</Link>
								<ShareDialog />
							</Row>
						</View>
					))}
				</View>
			</View>
		</DefaultLayout>
	);
}
