import { ponder } from "@/generated";
import { formatAddress } from "@wavpoint/utils";

ponder.on("ZoraCreator1155Impl:TransferBatch", async ({ event, context }) => {
	if (event.args.from !== "0x0000000000000000000000000000000000000000") return;

	for (let i = 0; i < event.args.ids.length; i++) {
		const token = await context.db.MintCount.findUnique({
			id: `${Number(
				event.args.ids[i],
			).toString()}:${event.log.address.toLowerCase()}`,
		});

		if (token) {
			await context.db.MintCount.update({
				id: `${Number(
					event.args.ids[i],
				).toString()}:${event.log.address.toLowerCase()}`,
				data: {
					mintCount: token?.mintCount + Number(event.args.values[i]),
				},
			});
		} else {
			await context.db.MintCount.create({
				id: `${Number(
					event.args.ids[i],
				).toString()}:${event.log.address.toLowerCase()}`,
				data: {
					collectionAddress: event.log.address.toLowerCase(),
					mintCount: Number(event.args.values[i]),
					tokenId: Number(event.args.ids[i]).toString(),
				},
			});
		}

		const ownedToken = await context.db.OwnedToken.findUnique({
			id: `${event.args.to.toLowerCase()}:${Number(
				event.args.ids[i],
			).toString()}:${event.log.address.toLowerCase()}`,
		});

		if (ownedToken) {
			await context.db.OwnedToken.update({
				id: `${event.args.to.toLowerCase()}:${Number(
					event.args.ids[i],
				).toString()}:${event.log.address.toLowerCase()}`,
				data: {
					amountOwned: ownedToken.amountOwned + Number(event.args.values[i]),
				},
			});
		} else {
			await context.db.User.upsert({
				id: event.args.to.toLowerCase(),
				create: {
					image: "",
					username: formatAddress(event.args.to.toLowerCase()),
				},
				update: {},
			});

			await context.db.OwnedToken.create({
				id: `${event.args.to.toLowerCase()}:${Number(
					event.args.ids[i],
				).toString()}:${event.log.address.toLowerCase()}`,
				data: {
					amountOwned: Number(event.args.values[i]),
					collectionAddress: event.log.address.toLowerCase(),
					tokenId: Number(event.args.ids[i]).toString(),
					userId: event.args.to.toLowerCase(),
				},
			});
		}
	}
});

ponder.on("ZoraCreator1155Impl:TransferSingle", async ({ event, context }) => {
	if (event.args.from !== "0x0000000000000000000000000000000000000000") return;

	const token = await context.db.MintCount.findUnique({
		id: `${Number(
			event.args.id,
		).toString()}:${event.log.address.toLowerCase()}`,
	});

	if (token) {
		await context.db.MintCount.update({
			id: `${Number(
				event.args.id,
			).toString()}:${event.log.address.toLowerCase()}`,
			data: {
				mintCount: token.mintCount + Number(event.args.value),
			},
		});
	} else {
		await context.db.MintCount.create({
			id: `${Number(
				event.args.id,
			).toString()}:${event.log.address.toLowerCase()}`,
			data: {
				collectionAddress: event.log.address.toLowerCase(),
				mintCount: Number(event.args.value),
				tokenId: Number(event.args.id).toString(),
			},
		});
	}

	const ownedToken = await context.db.OwnedToken.findUnique({
		id: `${event.args.to.toLowerCase()}:${Number(
			event.args.id,
		).toString()}:${event.log.address.toLowerCase()}`,
	});

	if (ownedToken) {
		await context.db.OwnedToken.update({
			id: `${event.args.to.toLowerCase()}:${Number(
				event.args.id,
			).toString()}:${event.log.address.toLowerCase()}`,
			data: {
				amountOwned: ownedToken.amountOwned + Number(event.args.value),
			},
		});
	} else {
		await context.db.User.upsert({
			id: event.args.to.toLowerCase(),
			create: {
				image: "",
				username: formatAddress(event.args.to.toLowerCase()),
			},
			update: {},
		});

		await context.db.OwnedToken.create({
			id: `${event.args.to.toLowerCase()}:${Number(
				event.args.id,
			).toString()}:${event.log.address.toLowerCase()}`,
			data: {
				amountOwned: Number(event.args.value),
				collectionAddress: event.log.address.toLowerCase(),
				tokenId: Number(event.args.id).toString(),
				userId: event.args.to.toLowerCase(),
			},
		});
	}
});

ponder.on("ZoraCreator1155Impl:SetupNewToken", async ({ event, context }) => {
	const data = await fetch(
		event.args.newURI.replace("ipfs://", "https://ipfs.io/ipfs/"),
	);

	const json = (await data.json()) as {
		name: string;
		description: string;
		image: string;
		animation_url: string;
		content: { mime: string; uri: string };
	};

	await context.db.ContentUrl.upsert({
		id: `${Number(event.args.tokenId)
			.toString()
			.toLowerCase()}:${event.log.address.toLowerCase()}`,
		create: {
			tokenId: Number(event.args.tokenId).toString().toLowerCase(),
			collectionAddress: event.log.address.toLowerCase(),
			url: json.content.uri.replace("ipfs://", "https://ipfs.io/ipfs/"),
		},
		update: {
			url: json.content.uri.replace("ipfs://", "https://ipfs.io/ipfs/"),
		},
	});
});
