import { ArweaveWebWallet } from 'arweave-wallet-connector';

export const arweaveWebWallet = new ArweaveWebWallet(
  {
    name: 'Arweave Demo',
    logo: 'https://jfbeats.github.io/ArweaveWalletConnector/placeholder.svg',
  },
  'arweave.app'
);
