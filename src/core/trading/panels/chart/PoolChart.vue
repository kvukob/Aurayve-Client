<script setup lang="ts">
import { useTradingStore } from 'src/core/trading/tradingStore';
import { computed, onMounted, watch } from 'vue';
import CandlestickChart from 'src/core/trading/panels/chart/CandlestickChart.vue';
import hub from 'src/util/api/hub';

const tradingStore = useTradingStore();
const selectedPoolGuid = computed(() => {
  return (tradingStore.getSelectedPool).guid;
});
const selectedPoolName = computed(() => {
  return  (tradingStore.getSelectedPool).primaryCoin.symbol +
          (tradingStore.getSelectedPool).secondaryCoin.symbol;
});
watch(selectedPoolGuid, async (newGuid, oldGuid) => {
  if (newGuid !== oldGuid) {
    await hub.tradingHub.getChartData(selectedPoolGuid.value);
    await hub.tradingHub.getChart(selectedPoolGuid.value)
  }
});
const chartData = computed(() => {
  return tradingStore.getChartData;
});
</script>

<template>
  <CandlestickChart :chartData="chartData" v-if="selectedPoolGuid" :title="selectedPoolName" />
</template>

<style scoped>

</style>
