import { arweave } from '../arweave-tasks/init-arweave';
import { useEffect, useState } from 'react';
import { arweaveAccount } from '../arweave-tasks/init-arweave-account';
import { ArAccount } from 'arweave-account';
import { APP_NAME, APP_VERSION } from '../api/send-app-transaction';
import { TransactionType } from '../api/transaction-type';
import { COMMENT_VERSION } from '../api/add-comment';
import { BlockweaveNode } from '../api/types/blockweave-node';
import { BlockweaveGqlEdge } from '../api/types/blockweave-gql-edge';

export interface PresentationProfileCommentType {
  txid?: string;
  author?: ArAccount;
  relativeTime?: string;
  length?: number;
  body?: string;
  error?: string;
}

interface BuildQueryCommentsParams {
  presentationId: string;
  count?: number;
}

const buildQueryComments = ({ presentationId, count = 100 }: BuildQueryCommentsParams) => {
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
        values: ["${TransactionType.comment}"]
       },
      {
        name: "Presentation-ID",
        values: ["${presentationId}"]
       },
      {
        name: "Comment-Version",
        values: ["${COMMENT_VERSION}"]
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

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const units: { [k: string]: number } = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const getRelativeTime = (ts1: number, ts2: number) => {
  const elapsed = ts1 - ts2;

  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
    }
  }
};

const getCommentTime = (timestamp: number | undefined) => {
  if (!timestamp || timestamp < 0) {
    return '(pending...)';
  }
  return getRelativeTime(timestamp * 1000, Date.now()) || 'unknown';
};

const buildComment = async (node: BlockweaveNode): Promise<PresentationProfileCommentType> => {
  const MAX_MESSAGE_LENGTH = 1024;
  const comment: PresentationProfileCommentType = {
    txid: node.id,
    author: await arweaveAccount.get(node.owner?.address),
    length: node.data.size,
    relativeTime: getCommentTime(node.block?.timestamp),
    error: '',
    body: '',
  };

  console.log('Comment node: ', node);

  if (comment.length) {
    if (comment.length <= MAX_MESSAGE_LENGTH) {
      await arweave.api
        .get(`/${node.id}`, { timeout: 10000 })
        .then(resp => (comment.body = resp.data))
        .catch(() => {
          comment.error = 'timeout loading data';
        });
    } else {
      comment.error = `message is too large (exceeds ${MAX_MESSAGE_LENGTH / 1024}kb)`;
    }
  }

  return comment;
};

export const usePresentationComments = (presentationId: string) => {
  const [comments, setComments] = useState<PresentationProfileCommentType[]>([]);
  const transactionQuery = buildQueryComments({ presentationId });
  const gqlParams = {
    query: transactionQuery,
  };
  const getComments = async () => {
    arweave.api
      .post('/graphql', gqlParams)
      .then(async results => {
        const sortedEdges = results.data.data.transactions.edges.sort((a: BlockweaveGqlEdge, b: BlockweaveGqlEdge) => {
          if (!a.node.block?.timestamp) {
            return 1;
          } else if (!b.node.block?.timestamp) {
            return -1;
          }

          return a.node.block?.timestamp - b.node.block?.timestamp;
        });
        const comments = await Promise.all(
          sortedEdges.map(async (edge: BlockweaveGqlEdge) => {
            return buildComment(edge.node);
          })
        );

        setComments(comments);
      })
      .catch(err => {
        console.error('GraphQL query failed', err, transactionQuery);
      });
  };

  useEffect(() => {
    console.log('Getting comments....');
    getComments();
  }, []);

  return { comments, updateComments: () => getComments() };
};
