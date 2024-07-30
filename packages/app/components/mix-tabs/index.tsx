import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@wavpoint/app/components/avatar";
import { fetchTokenMinters } from "@wavpoint/app/gql";
import type { TokenQuery } from "@wavpoint/app/gql/indexer/graphql";
import {
	Button,
	RodeoLogo,
	Row,
	Tabs,
	TabsList,
	TabsTrigger,
	Text,
	View,
} from "@wavpoint/app/ui";
import { ArrowUpRight } from "lucide-react-native";
import { useState } from "react";
import { MixCollectorsTab } from "./collectors";
import { MixCommentsTab } from "./comments";
import { MixDetailsTab } from "./details";
import { MixNotesTab } from "./notes";

interface MixTabsProps {
	token: TokenQuery["token"];
}

export function MixTabs({ token }: MixTabsProps) {
	const [tab, setTab] = useState("notes");

	return (
		<View className="w-full mt-8">
			<Row className="justify-between flex-col sm:flex-row gap-6 sm:gap-0">
				<View className="flex-1 mr-4">
					<Tabs value={tab} onValueChange={setTab}>
						<Row className="gap-4 mb-6 overflow-x-auto">
							<TabsList className="flex-row gap-6">
								<TabsTrigger value="notes">
									<Text className="font-bold">Notes</Text>
								</TabsTrigger>
								<TabsTrigger value="collectors" className="gap-2">
									<Text className="font-bold">Collectors</Text>
									<View className="w-6 h-6 items-center justify-center rounded-md bg-gradient-final">
										<Text>{token?.mintersCount}</Text>
									</View>
								</TabsTrigger>
								<TabsTrigger value="comments" className="gap-2">
									<Text className="font-bold">Comments</Text>
									<View className="w-6 h-6 items-center justify-center rounded-md bg-gradient-final">
										<Text>{token?.commentsCount}</Text>
									</View>
								</TabsTrigger>
								<TabsTrigger value="details">
									<Text className="font-bold">Details</Text>
								</TabsTrigger>
							</TabsList>
						</Row>
						<TabsContent value="notes">
							<MixNotesTab notes={token?.notes} />
						</TabsContent>
						<TabsContent value="collectors">
							<MixCollectorsTab tab={tab} token={token} />
						</TabsContent>
						<TabsContent value="comments">
							<MixCommentsTab tab={tab} tokenId={token?.tokenId} />
						</TabsContent>
						<TabsContent value="details">
							<MixDetailsTab token={token} />
						</TabsContent>
					</Tabs>
				</View>
				<View className="h-min">
					<Button variant={"outline"} className="border-primary gap-1.5 flex-1">
						<Text className="text-xs italic">inspired by</Text>
						<View className="w-3 h-3">
							<RodeoLogo />
						</View>
						<Text className="font-bold underline text-xs">Rodeo Club</Text>
						<ArrowUpRight className="text-primary w-4 h-4" />
					</Button>
				</View>
			</Row>
		</View>
	);
}
