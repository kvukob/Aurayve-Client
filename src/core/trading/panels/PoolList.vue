<script setup lang="ts">
import { computed } from 'vue';
import { Pool } from 'src/core/trading/types';
import { useTradingStore } from 'src/core/trading/tradingStore';

const tradingStore = useTradingStore();

const poolList = computed(() => {
  return tradingStore.getPoolList;
});

const selectPool = function(pool: Pool) {
  tradingStore.setSelectedPool(pool);
};

</script>

<template>
  <q-list>
    <div class="row items-center full-width q-pa-md">
      <div class="col-5">Pair</div>
      <div class="col-4">Price</div>
      <div class="col-3">Change</div>
    </div>
    <q-item v-for="pool in poolList" :key="pool" clickable dense @click="selectPool(pool)">
      <div class="row items-center full-width">
        <div class="col-5">
            <span>
            {{ pool.primaryCoin.symbol }}
            </span>
          <span class="text-grey-5">
            {{ pool.secondaryCoin.symbol }}
            </span>
        </div>
        <div class="col-4">
            <span>
             0.12552217
            </span>
        </div>
        <div class="col-3">
            <span>
              +2%
            </span>
        </div>
      </div>
    </q-item>
  </q-list>
</template>

<style scoped>

</style>
