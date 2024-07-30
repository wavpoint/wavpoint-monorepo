/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
};

export type Mint = {
  __typename?: 'Mint';
  amount: Scalars['Int']['output'];
  comment: Scalars['String']['output'];
  hasComment: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  token: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type MintFilter = {
  AND?: InputMaybe<Array<InputMaybe<MintFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MintFilter>>>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  amount_gt?: InputMaybe<Scalars['Int']['input']>;
  amount_gte?: InputMaybe<Scalars['Int']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  amount_lt?: InputMaybe<Scalars['Int']['input']>;
  amount_lte?: InputMaybe<Scalars['Int']['input']>;
  amount_not?: InputMaybe<Scalars['Int']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  comment?: InputMaybe<Scalars['String']['input']>;
  comment_contains?: InputMaybe<Scalars['String']['input']>;
  comment_ends_with?: InputMaybe<Scalars['String']['input']>;
  comment_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  comment_not?: InputMaybe<Scalars['String']['input']>;
  comment_not_contains?: InputMaybe<Scalars['String']['input']>;
  comment_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  comment_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  comment_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  comment_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasComment?: InputMaybe<Scalars['Boolean']['input']>;
  hasComment_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  hasComment_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasComment_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userId_contains?: InputMaybe<Scalars['String']['input']>;
  userId_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not?: InputMaybe<Scalars['String']['input']>;
  userId_not_contains?: InputMaybe<Scalars['String']['input']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type MintPage = {
  __typename?: 'MintPage';
  items: Array<Mint>;
  pageInfo: PageInfo;
};

export type OwnedToken = {
  __typename?: 'OwnedToken';
  amountOwned: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type OwnedTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<OwnedTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OwnedTokenFilter>>>;
  amountOwned?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_gt?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_gte?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  amountOwned_lt?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_lte?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_not?: InputMaybe<Scalars['Int']['input']>;
  amountOwned_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userId_contains?: InputMaybe<Scalars['String']['input']>;
  userId_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not?: InputMaybe<Scalars['String']['input']>;
  userId_not_contains?: InputMaybe<Scalars['String']['input']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type OwnedTokenPage = {
  __typename?: 'OwnedTokenPage';
  items: Array<OwnedToken>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  mint?: Maybe<Mint>;
  mints: MintPage;
  ownedToken?: Maybe<OwnedToken>;
  ownedTokens: OwnedTokenPage;
  token?: Maybe<Token>;
  tokens: TokenPage;
  user?: Maybe<User>;
  userToken?: Maybe<UserToken>;
  userTokens: UserTokenPage;
  users: UserPage;
};


export type QueryMintArgs = {
  id: Scalars['String']['input'];
};


export type QueryMintsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MintFilter>;
};


export type QueryOwnedTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryOwnedTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OwnedTokenFilter>;
};


export type QueryTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TokenFilter>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserTokenFilter>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserFilter>;
};

export type Token = {
  __typename?: 'Token';
  blockchain: Scalars['String']['output'];
  collectionAddress: Scalars['String']['output'];
  commentsCount: Scalars['Int']['output'];
  contentUrl: Scalars['String']['output'];
  firstMinter: User;
  firstMinterId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  mintCount: Scalars['Int']['output'];
  minters?: Maybe<OwnedTokenPage>;
  mintersCount: Scalars['Int']['output'];
  mints?: Maybe<MintPage>;
  name: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  tokenStandard: Scalars['String']['output'];
  topMinter: User;
  topMinterAmount: Scalars['Int']['output'];
  topMinterId: Scalars['String']['output'];
  userTokens?: Maybe<UserTokenPage>;
};


export type TokenMintersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OwnedTokenFilter>;
};


export type TokenMintsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MintFilter>;
};


export type TokenUserTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserTokenFilter>;
};

export type TokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  blockchain?: InputMaybe<Scalars['String']['input']>;
  blockchain_contains?: InputMaybe<Scalars['String']['input']>;
  blockchain_ends_with?: InputMaybe<Scalars['String']['input']>;
  blockchain_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blockchain_not?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blockchain_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  blockchain_starts_with?: InputMaybe<Scalars['String']['input']>;
  collectionAddress?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_contains?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  collectionAddress_not?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  collectionAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collectionAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentsCount?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  commentsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_not?: InputMaybe<Scalars['Int']['input']>;
  commentsCount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contentUrl?: InputMaybe<Scalars['String']['input']>;
  contentUrl_contains?: InputMaybe<Scalars['String']['input']>;
  contentUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentUrl_not?: InputMaybe<Scalars['String']['input']>;
  contentUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contentUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contentUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  firstMinterId?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_contains?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_ends_with?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstMinterId_not?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_not_contains?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstMinterId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  firstMinterId_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imageUrl_not?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  medium?: InputMaybe<Scalars['String']['input']>;
  medium_contains?: InputMaybe<Scalars['String']['input']>;
  medium_ends_with?: InputMaybe<Scalars['String']['input']>;
  medium_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  medium_not?: InputMaybe<Scalars['String']['input']>;
  medium_not_contains?: InputMaybe<Scalars['String']['input']>;
  medium_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  medium_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  medium_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  medium_starts_with?: InputMaybe<Scalars['String']['input']>;
  mintCount?: InputMaybe<Scalars['Int']['input']>;
  mintCount_gt?: InputMaybe<Scalars['Int']['input']>;
  mintCount_gte?: InputMaybe<Scalars['Int']['input']>;
  mintCount_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mintCount_lt?: InputMaybe<Scalars['Int']['input']>;
  mintCount_lte?: InputMaybe<Scalars['Int']['input']>;
  mintCount_not?: InputMaybe<Scalars['Int']['input']>;
  mintCount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mintersCount?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_gt?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_gte?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mintersCount_lt?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_lte?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_not?: InputMaybe<Scalars['Int']['input']>;
  mintersCount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_contains?: InputMaybe<Scalars['String']['input']>;
  notes_ends_with?: InputMaybe<Scalars['String']['input']>;
  notes_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notes_not?: InputMaybe<Scalars['String']['input']>;
  notes_not_contains?: InputMaybe<Scalars['String']['input']>;
  notes_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  notes_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notes_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  notes_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenStandard?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_contains?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenStandard_not?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenStandard_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenStandard_starts_with?: InputMaybe<Scalars['String']['input']>;
  topMinterAmount?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_gt?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_gte?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  topMinterAmount_lt?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_lte?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_not?: InputMaybe<Scalars['Int']['input']>;
  topMinterAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  topMinterId?: InputMaybe<Scalars['String']['input']>;
  topMinterId_contains?: InputMaybe<Scalars['String']['input']>;
  topMinterId_ends_with?: InputMaybe<Scalars['String']['input']>;
  topMinterId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  topMinterId_not?: InputMaybe<Scalars['String']['input']>;
  topMinterId_not_contains?: InputMaybe<Scalars['String']['input']>;
  topMinterId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  topMinterId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  topMinterId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  topMinterId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type TokenPage = {
  __typename?: 'TokenPage';
  items: Array<Token>;
  pageInfo: PageInfo;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  ownedTokens?: Maybe<OwnedTokenPage>;
  userTokens?: Maybe<UserTokenPage>;
  username: Scalars['String']['output'];
};


export type UserOwnedTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OwnedTokenFilter>;
};


export type UserUserTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserTokenFilter>;
};

export type UserFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_contains?: InputMaybe<Scalars['String']['input']>;
  username_ends_with?: InputMaybe<Scalars['String']['input']>;
  username_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  username_not?: InputMaybe<Scalars['String']['input']>;
  username_not_contains?: InputMaybe<Scalars['String']['input']>;
  username_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  username_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  username_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  username_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type UserPage = {
  __typename?: 'UserPage';
  items: Array<User>;
  pageInfo: PageInfo;
};

export type UserToken = {
  __typename?: 'UserToken';
  id: Scalars['String']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type UserTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserTokenFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userId_contains?: InputMaybe<Scalars['String']['input']>;
  userId_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not?: InputMaybe<Scalars['String']['input']>;
  userId_not_contains?: InputMaybe<Scalars['String']['input']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type UserTokenPage = {
  __typename?: 'UserTokenPage';
  items: Array<UserToken>;
  pageInfo: PageInfo;
};

export type TokensQueryVariables = Exact<{ [key: string]: never; }>;


export type TokensQuery = { __typename?: 'Query', tokens: { __typename?: 'TokenPage', items: Array<{ __typename?: 'Token', tokenId: string, imageUrl: string, name: string, mintCount: number }> } };

export type TokenQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type TokenQuery = { __typename?: 'Query', token?: { __typename?: 'Token', contentUrl: string, imageUrl: string, medium: string, name: string, mintCount: number, notes: string, mintersCount: number, commentsCount: number, tokenStandard: string, blockchain: string, collectionAddress: string, tokenId: string, topMinterId: string, firstMinterId: string } | null };

export type TokenNameQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type TokenNameQuery = { __typename?: 'Query', token?: { __typename?: 'Token', name: string } | null };

export type TokenMintCountQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type TokenMintCountQuery = { __typename?: 'Query', token?: { __typename?: 'Token', mintCount: number } | null };

export type UserTokensQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type UserTokensQuery = { __typename?: 'Query', user?: { __typename?: 'User', userTokens?: { __typename?: 'UserTokenPage', items: Array<{ __typename?: 'UserToken', token: { __typename?: 'Token', name: string, tokenId: string, imageUrl: string, mintCount: number } }> } | null } | null };

export type UserOwnsTokenQueryVariables = Exact<{
  user: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type UserOwnsTokenQuery = { __typename?: 'Query', ownedTokens: { __typename?: 'OwnedTokenPage', items: Array<{ __typename?: 'OwnedToken', amountOwned: number }> } };

export type TokenMintersQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type TokenMintersQuery = { __typename?: 'Query', ownedTokens: { __typename?: 'OwnedTokenPage', items: Array<{ __typename?: 'OwnedToken', amountOwned: number, user: { __typename?: 'User', id: string, username: string, image: string } }> } };

export type MintsWithCommentsQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type MintsWithCommentsQuery = { __typename?: 'Query', mints: { __typename?: 'MintPage', items: Array<{ __typename?: 'Mint', comment: string, timestamp: any, user: { __typename?: 'User', id: string, username: string, image: string } }> } };


export const TokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mintCount"}}]}}]}}]}}]} as unknown as DocumentNode<TokensQuery, TokensQueryVariables>;
export const TokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"token"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mintCount"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"mintersCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenStandard"}},{"kind":"Field","name":{"kind":"Name","value":"blockchain"}},{"kind":"Field","name":{"kind":"Name","value":"collectionAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"topMinterId"}},{"kind":"Field","name":{"kind":"Name","value":"firstMinterId"}}]}}]}}]} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>;
export const TokenNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokenName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TokenNameQuery, TokenNameQueryVariables>;
export const TokenMintCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokenMintCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mintCount"}}]}}]}}]} as unknown as DocumentNode<TokenMintCountQuery, TokenMintCountQueryVariables>;
export const UserTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mintCount"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserTokensQuery, UserTokensQueryVariables>;
export const UserOwnsTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userOwnsToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownedTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountOwned"}}]}}]}}]}}]} as unknown as DocumentNode<UserOwnsTokenQuery, UserOwnsTokenQueryVariables>;
export const TokenMintersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokenMinters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownedTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amountOwned"}}]}}]}}]}}]} as unknown as DocumentNode<TokenMintersQuery, TokenMintersQueryVariables>;
export const MintsWithCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mintsWithComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hasComment"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MintsWithCommentsQuery, MintsWithCommentsQueryVariables>;