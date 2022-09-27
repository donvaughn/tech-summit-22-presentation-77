import React, { useEffect, useState } from 'react';
import { arweaveAccount } from './init-arweave-account';
import { Link } from 'react-router-dom';
import { navigationItems } from '../views/Navigation';

export function FetchArweaveAccount() {
  const [isWalletConnected, setIsWalletConnected] = useState(!!window.arweaveWallet?.getActiveAddress());
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (isWalletConnected) {
      const getAccount = async () => {
        const activeAddress = await window.arweaveWallet.getActiveAddress();
        const info = await arweaveAccount.get(activeAddress);

        if (info.txid != null) {
          setName(info.profile.name);
          setHandle(info.handle);
          setProfilePic(info.profile.avatarURL);
        } else {
          setName(info.handle);
          setHandle('Edit Account');
          setProfilePic('./assets/empty-image.png');
        }
      };

      getAccount();
    }
  }, [isWalletConnected]);

  return (
    <>
      <section className="flex font-medium items-center justify-center h-screen">
        {!isWalletConnected && <Link to={navigationItems.connectWallet.path!}>Wallet not connected</Link>}

        {isWalletConnected && (
          <section className="w-[80vw] max-w-[350px] mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex place-content-end">
              <a href="https://account.metaweave.xyz" target="_blank" className="text-emerald-400">
                {/*<img className="w-6 h-6 fill" src="./assets/pencil.svg" alt="edit profile" />*/}
                <svg className="w-6 h-6 fill-slate-300 hover:fill-white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z" />
                  <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" />
                </svg>
              </a>
            </div>
            <div className="mt-6 w-fit mx-auto">
              <img src={profilePic} className="rounded-full w-28 " alt="profile picture" srcSet="" />
            </div>

            <div className="mt-8 ">
              <h2 className="text-white font-bold text-2xl tracking-wide">{name}</h2>
            </div>
            <div className="mt-8 ">
              <h2 className="text-white tracking-wide">{handle}</h2>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
