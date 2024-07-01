"use client";

import { Button, Text, View } from "@wavpoint/app/ui";
import { Link } from "solito/link";

export function ProfileNotFoundScreen() {
	return (
		<View className="items-center w-full gap-4 pt-20 justify-center">
			<View className="gap-2 items-center">
				<Text className="text-xl font-bold">Profile Not Found</Text>
				<Text>The profile you&apos;re searching for does not exist.</Text>
			</View>
			<Link href={"/"}>
				<Button variant="outline" className="border-primary text-primary">
					Go Home
				</Button>
			</Link>
		</View>
	);
}
