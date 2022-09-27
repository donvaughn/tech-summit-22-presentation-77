import React, { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchTransactionList } from '../arweave-tasks/fetch-transaction-list';
import { FetchTransactionData } from '../arweave-tasks/fetch-transaction-data';
import { ConnectWallet } from '../arweave-tasks/connect-wallet';
import { SendTransaction } from '../arweave-tasks/send-transaction';
import { FetchArweaveAccount } from '../arweave-tasks/fetch-arweave-account';

interface NavigationItem {
  label?: string;
  path?: string;
  element?: ReactNode;
}

export const navigationItems: { [k: string]: NavigationItem } = {
  transactionList: {
    label: 'fetching transaction list',
    path: '/',
    element: <FetchTransactionList />,
  },
  transactionData: {
    label: 'fetching transaction data',
    path: '/data',
    element: <FetchTransactionData />,
  },
  connectWallet: {
    label: 'connecting wallet',
    path: '/connect',
    element: <ConnectWallet />,
  },
  transaction: {
    label: 'sending transactions',
    path: '/transaction',
    element: <SendTransaction />,
  },
  account: {
    label: 'account',
    path: '/account',
    element: <FetchArweaveAccount />,
  },
};

export function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<NavigationItem>(
    Object.values(navigationItems).find(navigationItem => location.pathname === navigationItem.path) || {}
  );

  function updateNavigation(tab: NavigationItem) {
    navigate(tab.path || '');
    setCurrentTab(tab);
  }

  return (
    <>
      <button className="fixed right-5 bottom-5 rounded-3xl flex flex-nowrap items-center pl-11 pr-5 bg-slate-700" onMouseDown={() => setIsNavOpen(true)}>
        <div className="mr-4 text-slate-300 uppercase">{currentTab?.label}</div>
        <svg
          className="h-12 w-12 stroke-slate-500 hover:stroke-slate-100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </button>

      {isNavOpen && (
        <div className="absolute top-0 left-0 w-[100%] h-[100%]" onMouseDown={() => setIsNavOpen(false)}>
          <div className="absolute bottom-0 right-0 p-5">
            <div className="w-[80vw] max-w-[400px] bg-slate-200 rounded-2xl overflow-hidden">
              {Object.keys(navigationItems).map((key, index) => {
                const tab = navigationItems[key as keyof typeof navigationItems];
                const isLast = index === Object.keys(navigationItems).length - 1;
                const isCurrentItem = tab === currentTab;
                const tabHighlightColor = 'bg-slate-300';
                const tabBorder = isLast ? '' : 'border-b-slate-300';
                const tabBgColor = isCurrentItem ? tabHighlightColor : '';
                const cursor = isCurrentItem ? 'cursor-default' : 'cursor-pointer';

                return (
                  <div
                    onMouseDown={() => updateNavigation(tab)}
                    key={key}
                    className={`${tabBgColor} ${tabBorder} ${cursor} border py-4 text-right hover:bg-slate-300`}
                  >
                    <span className={`uppercase text-slate-800 px-5 ${cursor}`}>{tab.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
