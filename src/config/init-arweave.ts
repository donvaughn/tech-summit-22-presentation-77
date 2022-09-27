import Arweave from 'arweave';
import { ApiConfig } from 'arweave/web/lib/api';

export const arweave = Arweave.init(getConfig());

function getConfig(environment: 'development' | 'prod' = 'prod'): ApiConfig {
  const environmentConfig: { [k: string]: ApiConfig } = {
    development: {
      host: 'localhost',
      port: 1984,
      protocol: 'http',
    },
    prod: {},
  };

  return environmentConfig[environment];
}
