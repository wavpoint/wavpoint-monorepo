/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery tokens {\n\t\ttokens {\n\t\t\titems {\n\t\t\ttokenId\n\t\t\timageUrl\n\t\t\tname\n\t\t\tmintCount\n\t\t\t}\n\t\t}\n\t}\n": types.TokensDocument,
    "\n\tquery token($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tcontentUrl\n\t\t\timageUrl\n\t\t\tmedium\n\t\t\tname\n\t\t\tmintCount\n\t\t\tnotes\n\t\t}\n\t}\n": types.TokenDocument,
    "\n\tquery tokenName($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tname\n\t\t}\n\t}\n": types.TokenNameDocument,
    "\n\tquery tokenMintCount($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n    \t\tmintCount\n  \t\t}\n\t}\n": types.TokenMintCountDocument,
    "\n\tquery userTokens($user: String!) {\n\t\tuser(id: $user) {\n\t\t\tuserTokens {\n\t\t\titems {\n\t\t\t\ttoken {\n\t\t\t\tname\n\t\t\t\ttokenId\n\t\t\t\timageUrl\n\t\t\t\tmintCount\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.UserTokensDocument,
    "\n\tquery userOwnsToken($user: String!, $token: String!) {\n\t\townedTokens(where: {AND: {user: $user, token: $token}}) {\n\t\t\titems {\n\t\t\tamountOwned\n\t\t\t}\n\t\t}\n\t}\n": types.UserOwnsTokenDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery tokens {\n\t\ttokens {\n\t\t\titems {\n\t\t\ttokenId\n\t\t\timageUrl\n\t\t\tname\n\t\t\tmintCount\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery tokens {\n\t\ttokens {\n\t\t\titems {\n\t\t\ttokenId\n\t\t\timageUrl\n\t\t\tname\n\t\t\tmintCount\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery token($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tcontentUrl\n\t\t\timageUrl\n\t\t\tmedium\n\t\t\tname\n\t\t\tmintCount\n\t\t\tnotes\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery token($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tcontentUrl\n\t\t\timageUrl\n\t\t\tmedium\n\t\t\tname\n\t\t\tmintCount\n\t\t\tnotes\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery tokenName($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery tokenName($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery tokenMintCount($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n    \t\tmintCount\n  \t\t}\n\t}\n"): (typeof documents)["\n\tquery tokenMintCount($tokenId: String!) {\n\t\ttoken(id: $tokenId) {\n    \t\tmintCount\n  \t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery userTokens($user: String!) {\n\t\tuser(id: $user) {\n\t\t\tuserTokens {\n\t\t\titems {\n\t\t\t\ttoken {\n\t\t\t\tname\n\t\t\t\ttokenId\n\t\t\t\timageUrl\n\t\t\t\tmintCount\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery userTokens($user: String!) {\n\t\tuser(id: $user) {\n\t\t\tuserTokens {\n\t\t\titems {\n\t\t\t\ttoken {\n\t\t\t\tname\n\t\t\t\ttokenId\n\t\t\t\timageUrl\n\t\t\t\tmintCount\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery userOwnsToken($user: String!, $token: String!) {\n\t\townedTokens(where: {AND: {user: $user, token: $token}}) {\n\t\t\titems {\n\t\t\tamountOwned\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery userOwnsToken($user: String!, $token: String!) {\n\t\townedTokens(where: {AND: {user: $user, token: $token}}) {\n\t\t\titems {\n\t\t\tamountOwned\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;