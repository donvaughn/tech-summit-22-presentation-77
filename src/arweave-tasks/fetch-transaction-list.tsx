import React, { useEffect, useState } from 'react';
import { buildQueryComments } from './build-query-comments';
import { arweave } from './init-arweave';

export function FetchTransactionList() {
  const [results, setResults] = useState('Querying...');

  useEffect(() => {
    const transactionQuery = buildQueryComments();
    const gqlParams = {
      query: transactionQuery,
    };

    // TODO 1b
    arweave.api
      .post('/graphql', gqlParams)
      .then(results => setResults(results.data.data.transactions.edges))
      .catch(err => {
        console.error('GraphQL query failed', transactionQuery);
      });
  }, []);

  return (
    <>
      {JSON.stringify(results, null, 2)
        .split('\n')
        .map((line, key) => {
          const transactionId = line.match(/^\s*"id": "([^"]*)",?$/) && RegExp.$1;

          return (
            <div key={key}>
              {transactionId && (
                <pre>
                  <a href={`https://v2.viewblock.io/arweave/tx/${transactionId}`} target="_blank">
                    {line}
                  </a>
                </pre>
              )}
              {!transactionId && <pre>{line}</pre>}
            </div>
          );
        })}
    </>
  );
}
