// @ts-check
import { defineStore } from 'pinia';
import { Wallet } from 'src/core/wallet/types';

export const useWalletStore = defineStore({
  id: 'wallet',

  state: () => ({
    wallet: {} as Wallet,
  }),

  getters: {
    getWallet(state) {
      return state.wallet;
    },
  },

  actions: {
    setWallet(wallet: Wallet) {
      this.wallet = wallet;
    },
  },
});
