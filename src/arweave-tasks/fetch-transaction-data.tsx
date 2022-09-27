import React, { useEffect, useState } from 'react';
import { arweave } from './init-arweave';

export function FetchTransactionData() {
  const transaction = {
    id: 'DO6OiCyZQ5hwYMQbr6IkIlo0fkfe1pIgiJRuP84NRNA',
  };
  const [transactionData, setTransactionData] = useState('Querying...');

  useEffect(() => {
    // TODO 2
    arweave.api
      .get(`/${transaction.id}`, { timeout: 10000 })
      .then(response => (response.status === 404 ? 'Transaction ID not found' : response.data))
      .then(data => setTransactionData(data))
      .catch(() => 'Transaction request timed out');
  }, []);

  return (
    <>
      <p className="font-medium leading-tight ml-10 mt-20 mb-3">Transaction ID: {transaction.id}</p>
      <hr />
      <pre className="m-10">{transactionData}</pre>
    </>
  );
}
