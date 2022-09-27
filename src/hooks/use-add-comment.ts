import { useEffect, useState } from 'react';
import { addComment } from '../api/add-comment';

interface Params {
  presentationId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useAddComment({ presentationId, onSuccess, onError }: Params) {
  const [newComment, setNewComment] = useState<string | undefined>('');

  useEffect(() => {
    if (newComment) {
      addComment(newComment, presentationId)
        .then(result => {
          console.log('Dispatch result: ', result);
          onSuccess && onSuccess();
        })
        .catch(err => {
          console.error('Dispatch error: ', err);
          onError && onError();
        })
        .finally(() => setNewComment(undefined));
    }
  }, [newComment]);

  return [setNewComment];
}
