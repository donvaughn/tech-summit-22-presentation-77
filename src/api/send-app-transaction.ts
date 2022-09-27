import { arweave } from '../config/init-arweave';

export type ArweaveTagList = { [k: string]: string };

export const APP_NAME = 'ArweavePresentationTS2022';
export const APP_VERSION = '0.0.1-alpha';

export const AppTagList: ArweaveTagList = {
  'App-Name': APP_NAME,
  'Content-Type': 'text/plain',
  'Version': APP_VERSION,
};

export async function sendAppTransaction(data: string | Uint8Array | ArrayBuffer, additionalTags: ArweaveTagList = {}) {
  const tx = await arweave.createTransaction({ data });

  for (const appTagListKey in AppTagList) {
    tx.addTag(appTagListKey, AppTagList[appTagListKey]);
  }
  for (const tagKey in additionalTags) {
    tx.addTag(tagKey, additionalTags[tagKey]);
  }

  try {
    return window.arweaveWallet.dispatch(tx);
  } catch (err) {
    console.error('Failed to send transaction:', err, tx);
  }
}
