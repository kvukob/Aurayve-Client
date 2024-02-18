<script setup lang="ts">
import { useTradingStore } from 'src/core/trading/tradingStore';
import { computed } from 'vue';

const tradingStore = useTradingStore();

const pool = computed(() => {
  return tradingStore.getSelectedPool;
});

const effectivePrice = computed(() => {
  return Number.parseFloat((pool.value.pooledSecondaryCoin / pool.value.pooledPrimaryCoin).toFixed(8));
});

</script>

<template>

  <q-card v-if="pool.primaryCoin"  class="card">
    <q-card-section>
      <q-list>
        <div class="row justify-center text-body1 text-grey-5">Pool Details</div>
        <q-separator color="accent" class="q-ma-sm" />
        <q-item>
          <q-item-section>Pooled {{ pool.primaryCoin.symbol }}</q-item-section>
          <q-item-section side>{{ pool.pooledPrimaryCoin }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Pooled {{ pool.secondaryCoin.symbol }}</q-item-section>
          <q-item-section side>{{ pool.pooledSecondaryCoin }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Effective Price</q-item-section>
          <q-item-section side>{{ effectivePrice }} {{ pool.secondaryCoin.symbol }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
