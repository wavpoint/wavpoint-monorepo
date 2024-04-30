"use client";

import { DefaultLayout } from "@repo/app/features/layouts";
import { Button, Row, View } from "@repo/app/ui";

import { ArrowUpRight, Disc3, Download } from "lucide-react-native";
import { Link } from "solito/link";

export function HomeScreen() {
	return (
		<DefaultLayout>
			<View className="flex-1 flex max-w-xl w-full gap-2 flex-row flex-wrap justify-evenly">
				{Array.from({ length: 10 }).map((_, i) => (
					<View className="items-start gap-1" key={`${i * 2}_item`}>
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

						<Link href={`/mix/${String(i + 1).padStart(3, "0")}`}>
							<Button
								variant={"link"}
								className="px-0 flex justify-between w-full items-center font-bold"
								size={"sm"}
							>
								S{String(i + 1).padStart(3, "0")} - Lootmatic & Trucalyptus
								<ArrowUpRight className="w-4 h-4 mt-1 text-primary" />
							</Button>
						</Link>
					</View>
				))}
			</View>
		</DefaultLayout>
	);
}
