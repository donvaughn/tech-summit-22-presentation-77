import Account from 'arweave-account';

export const arweaveAccount = new Account({
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 3600000, // 1 hour
});
