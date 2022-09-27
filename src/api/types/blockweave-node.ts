import { TransactionTag } from './transaction-tag';

export interface BlockweaveNode {
  id: string;
  owner: {
    address: string;
  };
  data: {
    size: number;
  };
  block?: {
    height: number;
    timestamp: number;
  };
  tags: TransactionTag[];
}
