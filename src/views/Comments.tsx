import { PresentationProfileCommentType } from '../hooks/use-presentation-comments';
import { useEffect } from 'react';
import { AddComment } from './AddComment';
import { PRESENTATION_ID } from './PresentationProfile';

interface Props {
  comments: PresentationProfileCommentType[];
  onCommentAdded?: () => void;
}

export function Comments({ comments, onCommentAdded }: Props) {
  useEffect(() => {
    console.log('comments: ', comments);
  }, [comments]);

  return (
    <>
      {!comments?.length && (
        <div className="px-0 mx-auto lg:px-14">
          <div className="flex-col w-full py-4 mx-auto mb-5 bg-white border-b-2 lg:border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 lg:rounded-lg sm:shadow-sm">
            <div className="flex flex-row place-content-center">
              <div className="text-center px-2 ml-2 leading-loose text-gray-600">No comments yet. Be the first!</div>
            </div>
          </div>
        </div>
      )}

      {comments.map((comment: PresentationProfileCommentType, key) => (
        <div key={key} className="px-0 mx-auto lg:px-14">
          <div className="flex-col w-full py-4 mx-auto mb-5 bg-white border-b-2 lg:border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 lg:rounded-lg sm:shadow-sm">
            <div className="flex flex-row">
              {comment.author?.profile?.avatarURL && (
                <img
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  alt={`${comment.author?.profile?.name}'s avatar`}
                  src={comment.author?.profile?.avatarURL || 'assets/empty-image.svg'}
                />
              )}
              <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                  {comment.author?.profile?.name || `${comment.author?.profile?.handleName}` || 'Anonymous'}
                  <span className="ml-2 text-xs font-normal text-gray-500">{comment.relativeTime}</span>
                </div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">{comment.body}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <AddComment presentationId={PRESENTATION_ID} onCommentAdded={() => onCommentAdded && onCommentAdded()} />
    </>
  );
}
