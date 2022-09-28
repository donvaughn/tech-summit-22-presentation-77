import { sendAppTransaction } from './send-app-transaction';
import { TransactionType } from './transaction-type';

export const COMMENT_VERSION = '0.0.2-alpha-comment';

export async function addComment(comment: string, presentationId: string) {
  return sendAppTransaction(comment, {
    'Type': TransactionType.comment,
    'Presentation-ID': presentationId,
    'Comment-Version': COMMENT_VERSION,
  });
}
