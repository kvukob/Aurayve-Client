<script setup lang="ts">
import PoolOrderPanel from 'src/core/trading/panels/PoolOrderPanel.vue';
import { computed, onMounted, ref } from 'vue';
import LiquidityPanel from 'src/core/trading/panels/LiquidityPanel.vue';
import PoolList from 'src/core/trading/panels/PoolList.vue';
import hub from 'src/util/api/hub';
import PoolChart from 'src/core/trading/panels/chart/PoolChart.vue';
import PoolDetailsPanel from 'src/core/trading/panels/PoolDetailsPanel.vue';
import PoolRecentTradesPanel from 'src/core/trading/panels/PoolRecentTradesPanel.vue';
import { useAccountStore } from 'src/core/accounts/accountStore';

const tab = ref('place.order');
const accountStore = useAccountStore();

const isLoggedIn = computed(() => {
  return accountStore.getIsLoggedIn;
});


onMounted(async () => {
  await hub.tradingHub.getPools();
  if (isLoggedIn.value) {
    await hub.walletHub.getWallet();
  }
});

</script>

<template>
  <q-page class="row">
    <div class="row col-12">
      <q-card class="col-2 bg-transparent"  flat>
        <PoolList />
      </q-card>
      <div class="col-7 ">
        <q-card style="height: calc(100% - 360px)" class="q-pa-sm" flat>
          <PoolChart />
        </q-card>
        <q-card flat style="height: 360px">
          <q-tabs v-model="tab" active-color="primary" no-caps align="center">
            <q-tab name="place.order" label="Place Order" />
            <q-tab name="liquidity" label="Liquidity" />
          </q-tabs>
          <q-tab-panels v-model="tab">
            <q-tab-panel name="place.order">
              <PoolOrderPanel />
            </q-tab-panel>
            <q-tab-panel name="liquidity">
              <LiquidityPanel />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <q-card class="col-3 bg-transparent" flat>
        <div style="height: 64%">
          <PoolRecentTradesPanel />
        </div>
        <div style="height: 35%">
          <PoolDetailsPanel />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>

</style>
