export interface Coin {
  name: string;
  symbol: string;
}

export interface  Pool {
  guid: string;
  liquidityCoin: Coin;
  primaryCoin: Coin;
  secondaryCoin: Coin;
  pooledPrimaryCoin: number;
  pooledSecondaryCoin: number;
}

export interface PoolList {
  poolList: Array<Pool>;
}
