import { APP_NAME, APP_VERSION } from './send-app-transaction';
import { TransactionType } from './transaction-type';
import { UPVOTE_VERSION } from './save-upvote';
import { arweave } from '../config/init-arweave';
import { BlockweaveGqlEdge } from './types/blockweave-gql-edge';

interface BuildQueryParams {
  presentationId: string;
  count?: number;
}
const buildQuery = ({ presentationId, count = 100 }: BuildQueryParams) => {
  return `{
    transactions(
      first: ${count},
      tags: [
       {
         name: "App-Name",
         values: ["${APP_NAME}"]
       },
       {
         name: "Content-Type",
         values: ["text/plain"]
       },
      {
        name: "Version",
        values: ["${APP_VERSION}"]
       },
      {
        name: "Type",
        values: ["${TransactionType.upvote}"]
       },
      {
        name: "Presentation-ID",
        values: ["${presentationId}"]
       },
      {
        name: "Upvote-Version",
        values: ["${UPVOTE_VERSION}"]
       },
      ]
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`;
};

export const getUpvotes = async (presentationId: string) => {
  const transactionQuery = buildQuery({ presentationId });
  const gqlParams = {
    query: transactionQuery,
  };

  return arweave.api
    .post('/graphql', gqlParams)
    .then(async results => results.data.data.transactions.edges.map((edge: BlockweaveGqlEdge) => edge.node))
    .catch(err => {
      console.error('GraphQL query failed', err, transactionQuery);
    });
};
