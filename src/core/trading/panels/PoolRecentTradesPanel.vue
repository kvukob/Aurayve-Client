<script setup lang="ts">
import { useTradingStore } from 'src/core/trading/tradingStore';
import { computed, watch } from 'vue';
import hub from 'src/util/api/hub';
import { formatUTCDateToLocalShort } from 'src/util/utils';
import { colors, getCssVar } from 'quasar';
import lighten = colors.lighten;
import getPaletteColor = colors.getPaletteColor;
import changeAlpha = colors.changeAlpha;

const tradingStore = useTradingStore();

const selectedPoolGuid = computed(() => {
  return (tradingStore.getSelectedPool).guid;
});

const poolQuoteSymbol = computed(() => {
  if (tradingStore.getSelectedPool.primaryCoin)
    return tradingStore.getSelectedPool.primaryCoin.symbol;
  return '';
});

const recentTrades = computed(() => {
  return tradingStore.getRecentTrades;
});

watch(selectedPoolGuid, async (newGuid, oldGuid) => {
  if (newGuid !== oldGuid) {
    await hub.tradingHub.getRecentTrades(selectedPoolGuid.value);
  }
});

const formattedTime = function(logTime) {
  return formatUTCDateToLocalShort(logTime);
};

const formattedPrice = function(price) {
  return price.toFixed(8);
};

const itemStyle = function(tradeType) {
  if (tradeType === 0) {
    return {
      color: getPaletteColor('positive'),
      backgroundColor: lighten(getPaletteColor('positive'), -95),
      border: '1px dotted ' + changeAlpha(getPaletteColor('white'), 0.2)
    };
  } else {
    return {
      color: getCssVar('negative'),
      backgroundColor: lighten(getPaletteColor('negative'), -85),
      border: '1px dotted ' + changeAlpha(getPaletteColor('white'), 0.2)
    };
  }
};

</script>

<template>
  <q-list>
    <q-item class="row full-width q-pr-lg">
      <span class="col-4">
          Price
        </span>
      <span class="col-4 row justify-end">
          Quantity ({{ poolQuoteSymbol }})
        </span>
      <span class="col-4 row justify-end">
          Time
        </span>
    </q-item>
    <div style="overflow-y: auto; height: 50vh">
      <q-item v-for="log in recentTrades" :key="log" dense
              :style="itemStyle(log.tradeType)"
      >
        <div class="row full-width items-center">
        <span class="col-4 text-no-wrap">
          {{ formattedPrice(log.price) }}
        </span>
          <span class="col-4 text-no-wrap row justify-end">
          {{ log.quantityReceived }}
        </span>
          <span class="col-4 text-no-wrap row justify-end">
          {{ formattedTime(log.time) }}
        </span>
        </div>
      </q-item>
    </div>
  </q-list>
</template>

<style scoped>
</style>
