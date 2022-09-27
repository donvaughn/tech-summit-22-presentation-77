import { sendAppTransaction } from './send-app-transaction';
import { TransactionType } from './transaction-type';

export const UPVOTE_VERSION = '0.0.1-alpha-upvote';

export async function saveUpvote(presentationId: string) {
  return sendAppTransaction('1', {
    'Type': TransactionType.upvote,
    'Presentation-ID': presentationId,
    'Upvote-Version': UPVOTE_VERSION,
  });
}
