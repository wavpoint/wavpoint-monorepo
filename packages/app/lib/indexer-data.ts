import { graphql } from "../gql";

export const mintCountQueryDocument = graphql(`
	query mintCountQuery($tokenId: String!) {
		mintCount(id: $tokenId) {
    		mintCount
  		}
	}
`);
