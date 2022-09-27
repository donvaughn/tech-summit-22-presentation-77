import { useAddComment } from '../hooks/use-add-comment';
import { useState } from 'react';
import { useWallet } from '../hooks/use-wallet';

interface Props {
  presentationId: string;
  onCommentAdded?: () => void;
}

export function AddComment({ presentationId, onCommentAdded }: Props) {
  const [commentInput, setCommentInput] = useState('');
  const [addComment] = useAddComment({
    presentationId,
    onSuccess: () => {
      setCommentInput('');
      onCommentAdded && onCommentAdded();
    },
  });
  const { isWalletConnected, connectWallet } = useWallet();

  function onCommentSubmit() {
    if (isWalletConnected) {
      addComment(commentInput);
    } else {
      connectWallet();
    }
  }

  return (
    <div className="px-0 mx-auto lg:px-14 mb-12">
      <div className="flex-col w-full py-4 mx-auto bg-slate-100 border-b-2 lg:border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 lg:rounded-lg sm:shadow-sm">
        <div className="flex flex-row">
          <input
            placeholder="Enter comment..."
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            onKeyDown={event => event?.key === 'Enter' && onCommentSubmit()}
            className="border-slate-300 border-t rounded-tl rounded-bl grow px-4"
          />

          {!isWalletConnected && (
            <button
              className="text-white py-2 px-4 uppercase rounded-tr rounded-br bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform"
              onClick={() => onCommentSubmit()}
            >
              Connect Wallet to Comment
            </button>
          )}

          {isWalletConnected && (
            <button
              className="text-white py-2 px-4 uppercase rounded-tr rounded-br bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform"
              onClick={() => onCommentSubmit()}
            >
              Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
