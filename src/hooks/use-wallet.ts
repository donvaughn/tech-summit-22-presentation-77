import { useEffect, useState } from 'react';
import { arweaveWebWallet } from '../arweave-tasks/init-arweave-web-wallet';

interface Params {
  presentationId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useWallet() {
  const [isWalletConnected, setIsWalletConnected] = useState(!!arweaveWebWallet.address);

  useEffect(() => {
    arweaveWebWallet.on('change', () => {
      setIsWalletConnected(!!arweaveWebWallet.address);
    });
  }, []);

  return {
    isWalletConnected,
    connectWallet: () => {
      arweaveWebWallet.connect();
    },
  };
}
