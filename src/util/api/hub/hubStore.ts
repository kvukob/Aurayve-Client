// @ts-check
import { defineStore } from 'pinia';

export const useHubStore = defineStore({
  id: 'hub',

  state: () => ({
    connectionStatus: 'Disconnected',
  }),

  getters: {
    getConnectionStatus(state) {
      return state.connectionStatus;
    },
  },

  actions: {
    setConnectionStatus(newStatus: string) {
      this.connectionStatus = newStatus;
    },
  },
});
