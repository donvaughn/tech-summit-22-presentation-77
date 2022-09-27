import { useEffect, useState } from 'react';
import { saveUpvote } from '../api/save-upvote';
import { getUpvotes } from '../api/get-upvotes';

export function useUpvotes(presentationId: string) {
  const [upvoteData, setUpvoteData] = useState<any[]>([]);
  const addUpvote = () => {
    return saveUpvote(presentationId)
      .then(result => {
        console.log('Dispatch result: ', result);
        updateUpvoteData();
      })
      .catch(err => {
        console.error('Dispatch error: ', err);
      });
  };

  const updateUpvoteData = () => {
    getUpvotes(presentationId).then(upvotes => setUpvoteData(upvotes));
  };

  useEffect(() => {
    updateUpvoteData();
  }, []);

  return {
    upvoteData,
    addUpvote,
  };
}
