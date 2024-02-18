// @ts-check
import { defineStore } from 'pinia';
import { Pool } from 'src/core/trading/types';

export const useTradingStore = defineStore({
  id: 'pool',

  state: () => ({
    poolList: [] as Array<Pool>,
    selectedPool: {} as Pool,
    recentTrades: [],
    chartData: []
  }),

  getters: {
    getPoolList(state) {
      return state.poolList;
    },
    getSelectedPool(state) {
      return state.selectedPool;
    },
    getEffectivePrice(state) {
      return state.selectedPool.pooledSecondaryCoin / state.selectedPool.pooledPrimaryCoin;
    },
    getRecentTrades(state) {
      return state.recentTrades;
    },
    getChartData(state){
      return state.chartData
    }
  },

  actions: {
    setPoolList(poolList: Array<Pool>) {
      this.poolList = poolList;
    },
    setSelectedPool(pool: Pool) {
      this.selectedPool = pool;
    },
    setRecentTrades(trades: []) {
      this.recentTrades = trades;
    },
    setChartData(chartData: []) {
      this.chartData = chartData;
    },
  }
});
