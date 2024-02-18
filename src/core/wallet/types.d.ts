export interface Wallet {
  balances: Array<WalletBalance>;
}


export interface WalletBalance {
  name: string;
  symbol: string;
  quantity: number;
}
