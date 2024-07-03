/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type ContentUrl = {
	__typename?: "ContentUrl";
	collectionAddress: Scalars["String"]["output"];
	id: Scalars["String"]["output"];
	tokenId: Scalars["String"]["output"];
	url: Scalars["String"]["output"];
};

export type ContentUrlFilter = {
	AND?: InputMaybe<Array<InputMaybe<ContentUrlFilter>>>;
	OR?: InputMaybe<Array<InputMaybe<ContentUrlFilter>>>;
	collectionAddress?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id?: InputMaybe<Scalars["String"]["input"]>;
	id_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not?: InputMaybe<Scalars["String"]["input"]>;
	id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	url?: InputMaybe<Scalars["String"]["input"]>;
	url_contains?: InputMaybe<Scalars["String"]["input"]>;
	url_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	url_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	url_not?: InputMaybe<Scalars["String"]["input"]>;
	url_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	url_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	url_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	url_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	url_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export type ContentUrlPage = {
	__typename?: "ContentUrlPage";
	items: Array<ContentUrl>;
	pageInfo: PageInfo;
};

export type MintCount = {
	__typename?: "MintCount";
	collectionAddress: Scalars["String"]["output"];
	id: Scalars["String"]["output"];
	mintCount: Scalars["Int"]["output"];
	tokenId: Scalars["String"]["output"];
};

export type MintCountFilter = {
	AND?: InputMaybe<Array<InputMaybe<MintCountFilter>>>;
	OR?: InputMaybe<Array<InputMaybe<MintCountFilter>>>;
	collectionAddress?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id?: InputMaybe<Scalars["String"]["input"]>;
	id_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not?: InputMaybe<Scalars["String"]["input"]>;
	id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	mintCount?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
	mintCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_not?: InputMaybe<Scalars["Int"]["input"]>;
	mintCount_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
	tokenId?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export type MintCountPage = {
	__typename?: "MintCountPage";
	items: Array<MintCount>;
	pageInfo: PageInfo;
};

export type OwnedToken = {
	__typename?: "OwnedToken";
	amountOwned: Scalars["Int"]["output"];
	collectionAddress: Scalars["String"]["output"];
	id: Scalars["String"]["output"];
	tokenId: Scalars["String"]["output"];
	userId: Scalars["String"]["output"];
};

export type OwnedTokenFilter = {
	AND?: InputMaybe<Array<InputMaybe<OwnedTokenFilter>>>;
	OR?: InputMaybe<Array<InputMaybe<OwnedTokenFilter>>>;
	amountOwned?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_gt?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_gte?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
	amountOwned_lt?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_lte?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_not?: InputMaybe<Scalars["Int"]["input"]>;
	amountOwned_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
	collectionAddress?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_not_in?: InputMaybe<
		Array<InputMaybe<Scalars["String"]["input"]>>
	>;
	collectionAddress_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	collectionAddress_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id?: InputMaybe<Scalars["String"]["input"]>;
	id_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not?: InputMaybe<Scalars["String"]["input"]>;
	id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	tokenId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	tokenId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	userId?: InputMaybe<Scalars["String"]["input"]>;
	userId_contains?: InputMaybe<Scalars["String"]["input"]>;
	userId_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	userId_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	userId_not?: InputMaybe<Scalars["String"]["input"]>;
	userId_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	userId_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	userId_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	userId_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	userId_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export type OwnedTokenPage = {
	__typename?: "OwnedTokenPage";
	items: Array<OwnedToken>;
	pageInfo: PageInfo;
};

export type PageInfo = {
	__typename?: "PageInfo";
	endCursor?: Maybe<Scalars["String"]["output"]>;
	hasNextPage: Scalars["Boolean"]["output"];
	hasPreviousPage: Scalars["Boolean"]["output"];
	startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
	__typename?: "Query";
	contentUrl?: Maybe<ContentUrl>;
	contentUrls: ContentUrlPage;
	mintCount?: Maybe<MintCount>;
	mintCounts: MintCountPage;
	ownedToken?: Maybe<OwnedToken>;
	ownedTokens: OwnedTokenPage;
	user?: Maybe<User>;
	users: UserPage;
};

export type QueryContentUrlArgs = {
	id: Scalars["String"]["input"];
};

export type QueryContentUrlsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Scalars["String"]["input"]>;
	orderDirection?: InputMaybe<Scalars["String"]["input"]>;
	where?: InputMaybe<ContentUrlFilter>;
};

export type QueryMintCountArgs = {
	id: Scalars["String"]["input"];
};

export type QueryMintCountsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Scalars["String"]["input"]>;
	orderDirection?: InputMaybe<Scalars["String"]["input"]>;
	where?: InputMaybe<MintCountFilter>;
};

export type QueryOwnedTokenArgs = {
	id: Scalars["String"]["input"];
};

export type QueryOwnedTokensArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Scalars["String"]["input"]>;
	orderDirection?: InputMaybe<Scalars["String"]["input"]>;
	where?: InputMaybe<OwnedTokenFilter>;
};

export type QueryUserArgs = {
	id: Scalars["String"]["input"];
};

export type QueryUsersArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Scalars["String"]["input"]>;
	orderDirection?: InputMaybe<Scalars["String"]["input"]>;
	where?: InputMaybe<UserFilter>;
};

export type User = {
	__typename?: "User";
	id: Scalars["String"]["output"];
	image: Scalars["String"]["output"];
	ownedTokens?: Maybe<OwnedTokenPage>;
	username: Scalars["String"]["output"];
};

export type UserOwnedTokensArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Scalars["String"]["input"]>;
	orderDirection?: InputMaybe<Scalars["String"]["input"]>;
	where?: InputMaybe<OwnedTokenFilter>;
};

export type UserFilter = {
	AND?: InputMaybe<Array<InputMaybe<UserFilter>>>;
	OR?: InputMaybe<Array<InputMaybe<UserFilter>>>;
	id?: InputMaybe<Scalars["String"]["input"]>;
	id_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not?: InputMaybe<Scalars["String"]["input"]>;
	id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	id_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	id_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	id_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	image?: InputMaybe<Scalars["String"]["input"]>;
	image_contains?: InputMaybe<Scalars["String"]["input"]>;
	image_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	image_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	image_not?: InputMaybe<Scalars["String"]["input"]>;
	image_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	image_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	image_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	image_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	image_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	username?: InputMaybe<Scalars["String"]["input"]>;
	username_contains?: InputMaybe<Scalars["String"]["input"]>;
	username_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	username_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	username_not?: InputMaybe<Scalars["String"]["input"]>;
	username_not_contains?: InputMaybe<Scalars["String"]["input"]>;
	username_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
	username_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
	username_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
	username_starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserPage = {
	__typename?: "UserPage";
	items: Array<User>;
	pageInfo: PageInfo;
};

export type MintCountQueryQueryVariables = Exact<{
	tokenId: Scalars["String"]["input"];
}>;

export type MintCountQueryQuery = {
	__typename?: "Query";
	mintCount?: { __typename?: "MintCount"; mintCount: number } | null;
};

export const MintCountQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mintCountQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "tokenId" },
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "mintCount" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "tokenId" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "mintCount" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MintCountQueryQuery, MintCountQueryQueryVariables>;
