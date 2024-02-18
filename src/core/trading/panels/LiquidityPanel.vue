<script setup lang="ts">
import { computed, ref } from 'vue';
import hub from 'src/util/api/hub';
import { useWalletStore } from 'src/core/wallet/walletStore';
import { useTradingStore } from 'src/core/trading/tradingStore';

const walletStore = useWalletStore();
const tradingStore = useTradingStore();
const tab = ref('add.liquidity');

const form = ref({
  primaryQuantity: 0,
  secondaryQuantity: 0
});

const pool = computed(() => {
  return tradingStore.getSelectedPool;
});

const wallet = computed(() => {
  return walletStore.getWallet;
});

const getBalance = function(symbol: string) {
  if (wallet.value.balances !== undefined) {
    const balance = wallet.value.balances.find((balance) => balance.symbol === symbol);
    return balance !== undefined ? balance.quantity : 0;
  }
  return 0;
};

const effectivePrice = computed(() => {
  return Number.parseFloat((pool.value.pooledSecondaryCoin / pool.value.pooledPrimaryCoin).toFixed(8));
});
const secondaryQuantity = computed(() => {
  return form.value.primaryQuantity * effectivePrice.value
});
const addLiquidity = async function() {
  await hub.tradingHub.addLiquidity(pool.value.guid, form.value.primaryQuantity, form.value.secondaryQuantity);
};
</script>

<template>
  <q-card class="row" flat>
    <q-tabs v-model="tab" active-color="primary" no-caps align="center" vertical class="bg-dark col-2">
      <q-tab name="liquidity.details" label="Position" />
      <q-tab name="add.liquidity" label="Add Liquidity" />
      <q-tab name="trade.history" label="Remove Liquidity" />
    </q-tabs>
    <q-tab-panels v-model="tab" class="col-10">
      <q-tab-panel name="add.liquidity" class="q-pa-none">
        <q-card-section v-if="pool.primaryCoin">
          <q-form @submit="addLiquidity">
            <div class="row">
              <div class="col-6 q-pa-sm">
                <label>Primary Coin Quantity</label>
                <q-input outlined type="number" dense :step="0.005"
                         v-model="form.primaryQuantity">
                  <template v-slot:append>
                    {{ pool.primaryCoin.symbol }}
                  </template>
                </q-input>
                <div>
                  {{ getBalance(pool.primaryCoin.symbol) + ' available' }}
                </div>
              </div>
              <div class="col-6 q-pa-sm">
                <label>Secondary Coin Quantity (Auto-calculated)</label>
                <q-input outlined dense readonly
                         v-model="secondaryQuantity">
                  <template v-slot:append>
                    {{ pool.secondaryCoin.symbol }}
                  </template>
                </q-input>
                <div>
                  {{ getBalance(pool.secondaryCoin.symbol) + ' available' }}
                </div>
              </div>
              <div class="row justify-center">
                <q-btn label="Add Liquidity" color="primary text-black" type="submit" />
              </div>
            </div>
          </q-form>

        </q-card-section>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<style scoped>

</style>
