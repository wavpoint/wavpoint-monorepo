import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
	MintCount: p.createTable({
		id: p.string(),
		tokenId: p.string(),
		collectionAddress: p.string(),
		mintCount: p.int(),
	}),
	ContentUrl: p.createTable({
		id: p.string(),
		tokenId: p.string(),
		collectionAddress: p.string(),
		url: p.string(),
	}),
	User: p.createTable({
		id: p.string(),
		username: p.string(),
		image: p.string(),
		ownedTokens: p.many("OwnedToken.userId"),
	}),
	OwnedToken: p.createTable({
		id: p.string(),
		tokenId: p.string(),
		collectionAddress: p.string(),
		amountOwned: p.int(),
		userId: p.string().references("User.id"),
	}),
}));
