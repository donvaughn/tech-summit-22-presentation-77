import React, { useState } from 'react';
import { arweave } from './init-arweave';
import { Link } from 'react-router-dom';
import { navigationItems } from '../views/Navigation';

export function SendTransaction() {
  const [post, setPost] = useState('');
  const [postTxId, setPostTxId] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(!!window.arweaveWallet?.getActiveAddress());
  const [isPosting, setIsPosting] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  async function sendTransaction() {
    if (!post) {
      setShowEmptyError(true);
      return;
    }

    setPostTxId('');
    setIsPosting(true);
    setShowEmptyError(false);

    // TODO 4
    const tx = await arweave.createTransaction({ data: post });
    tx.addTag('App-Name', 'ArweaveKitchenSink');
    tx.addTag('Content-Type', 'text/plain');
    tx.addTag('Version', '0.0.1');
    tx.addTag('Type', 'post');
    try {
      const result = await window.arweaveWallet.dispatch(tx);

      setPostTxId(result.id);
      setPost('');
    } catch (err) {
      console.error('Post not sent:', err);
    }
    setIsPosting(false);
  }

  return (
    <>
      {postTxId && (
        <div className="flex place-content-center items-center p-4 w-full bg-white shadow bg-slate-700">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
            </svg>
          </div>
          <div className="ml-3 font-bold">
            Message posted!{' '}
            <a className="text-slate-300 font-normal hover:text-slate-50" href={`https://viewblock.io/arweave/tx/${postTxId}`} target="_blank">
              Open transaction&nbsp;&nbsp;➜
            </a>
          </div>
        </div>
      )}

      {!isWalletConnected && (
        <div className="grid h-screen place-items-center">
          <Link to={navigationItems.connectWallet.path!}>Connect wallet to continue&nbsp;&nbsp;➜</Link>
        </div>
      )}

      {isWalletConnected && (
        <div className="grid h-screen place-items-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">
            <div className="mb-4">
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="post"
                placeholder="Post your message..."
                onChange={e => setPost(e.target.value)}
                value={post}
              />
              <div className={`text-red ${showEmptyError ? 'visible' : 'invisible'} text-center`}>Enter a message to post</div>
            </div>
            <div className="flex">
              <button
                className="rounded-3xl uppercase grow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => sendTransaction()}
                disabled={isPosting}
              >
                send transaction
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
