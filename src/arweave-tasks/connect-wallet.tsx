import React, { useEffect, useState } from 'react';
import { arweaveWebWallet } from './init-arweave-web-wallet';

export function ConnectWallet() {
  const [isWalletConnected, setIsWalletConnected] = useState(!!arweaveWebWallet.address);

  useEffect(() => {
    arweaveWebWallet.on('change', () => {
      // TODO 3b
      setIsWalletConnected(!!arweaveWebWallet.address);
    });
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      {!isWalletConnected && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            // TODO 3a
            arweaveWebWallet.connect();
          }}
        >
          Connect Wallet
        </button>
      )}

      {isWalletConnected && <div>Wallet Connected: {arweaveWebWallet.address}</div>}
    </div>
  );
}
