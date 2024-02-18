<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTradingStore } from 'src/core/trading/tradingStore';
import { useWalletStore } from 'src/core/wallet/walletStore';
import hub from 'src/util/api/hub';


const walletStore = useWalletStore();
const tradingStore = useTradingStore();

const selectedPool = computed(() => {
  return tradingStore.getSelectedPool;
});
const baseCoinSymbol = computed(() => {
  return selectedPool.value.primaryCoin !== undefined ? selectedPool.value.primaryCoin.symbol : 'ARZ';
});
const quoteCoinSymbol = computed(() => {
  return selectedPool.value.secondaryCoin !== undefined ? selectedPool.value.secondaryCoin.symbol : 'AYST';
});

const wallet = computed(() => {
  return walletStore.getWallet;
});


// Resets sliders and amount fields when a new trading pair is selected
watch(selectedPool, async (newPool, oldPool) => {
  if (newPool !== oldPool) {
    orderForm.value.buyQuantity = 0;
    orderForm.value.sellQuantity = 0;
  }
});

const getBalance = function(symbol: string) {
  if (wallet.value.balances !== undefined) {
    const balance = wallet.value.balances.find((balance) => balance.symbol === symbol);
    return balance !== undefined ? balance.quantity : 0;
  }
  return 0;
};

const orderForm = ref({
  buyQuantity: 0,
  sellQuantity: 0
});


const placeBuyOrder = async function() {
  await hub.tradingHub.placeBuyOrder(selectedPool.value.guid, orderForm.value.buyQuantity);
};
const placeSellOrder = async function() {
  await hub.tradingHub.placeSellOrder(selectedPool.value.guid, orderForm.value.sellQuantity);
};

const ensureMaxBuy = function() {
  if (orderForm.value.buyQuantity > getBalance(quoteCoinSymbol.value))
    orderForm.value.buyQuantity = getBalance(quoteCoinSymbol.value);
  // Ensure no more than 8 decimal places
  if ((orderForm.value.buyQuantity * 1e8) % 1 !== 0) {
    orderForm.value.buyQuantity = Number.parseFloat(orderForm.value.buyQuantity.toFixed(8));
  }
};

const ensureSell = function() {
  if (Number.parseFloat(coinsReceivedOnSell.value) < 0)
    orderForm.value.sellQuantity = 0;
};


const estimateCoinsReceivedOnBuy = computed(() => {
  const selectedPool = tradingStore.getSelectedPool;
  const dBeta = orderForm.value.buyQuantity * 0.98;
  const k = selectedPool.pooledPrimaryCoin * selectedPool.pooledSecondaryCoin;
  const rAlpha = selectedPool.pooledPrimaryCoin;
  const rBeta = selectedPool.pooledSecondaryCoin;
  const dAlpha = k / (rBeta + dBeta);
  return (rAlpha - dAlpha).toFixed(8).toString();
});
const coinsReceivedOnSell = computed(() => {
  const selectedPool = tradingStore.getSelectedPool;
  const dAlpha = orderForm.value.sellQuantity * 0.98;
  const k = selectedPool.pooledPrimaryCoin * selectedPool.pooledSecondaryCoin;
  const rAlpha = selectedPool.pooledPrimaryCoin;
  const rBeta = selectedPool.pooledSecondaryCoin;
  const dBeta = k / (rAlpha - dAlpha);
  return (dBeta - rBeta).toFixed(8).toString();
});


</script>

<template>
  <q-card flat>
    <q-card-section class="row">
      <div class="col-6 q-pl-lg q-pr-lg">
        <div class="text-overline">
          Available: {{ getBalance(quoteCoinSymbol) }} {{ quoteCoinSymbol }}
        </div>
        <q-form @submit="placeBuyOrder">
          <q-input dense outlined class="form-item" v-model.number="orderForm.buyQuantity" type="number"
                   :step="0.00000001"
                   @keyup="ensureMaxBuy">
            <template v-slot:prepend>
              <span class="text-caption" style="width: 7ch">Amount</span>
              <q-separator vertical class="q-mr-sm" />
            </template>
            <template v-slot:append>
              <span class="text-caption">{{ quoteCoinSymbol }}</span>
            </template>
          </q-input>
          <q-slider dense v-model="orderForm.buyQuantity" :max="getBalance(quoteCoinSymbol)"
                    class="q-pa-sm" :step="0.0001" />
          <q-field dense outlined class="form-item" readonly
                   hint="estimated (incl. 0.02% fee)"
                   :label="orderForm.buyQuantity ? estimateCoinsReceivedOnBuy : ''">
            <template v-slot:prepend>
              <span class="text-caption" style="width: 7ch">Receive</span>
              <q-separator vertical class="q-mr-sm" />
            </template>
            <template v-slot:append>
              <span class="text-caption">{{ baseCoinSymbol }}</span>
            </template>
          </q-field>
          <q-separator class="q-ma-sm" />
          <q-btn label="Buy" color="positive" class="full-width" dense type="submit" />
        </q-form>
      </div>


      <div class="col-6 q-pl-lg q-pr-lg">
        <div class="text-overline">
          Available: {{ getBalance(baseCoinSymbol) }} {{ baseCoinSymbol }}
        </div>
        <q-form @submit="placeSellOrder">
          <q-input dense outlined class="form-item" v-model.number="orderForm.sellQuantity" type="number"
                   :step="0.00000001" @keyup="ensureSell">
            <template v-slot:prepend>
              <span class="text-caption" style="width: 7ch">Amount</span>
              <q-separator vertical class="q-mr-sm" />
            </template>
            <template v-slot:append>
              <span class="text-caption">{{ baseCoinSymbol }}</span>
            </template>
          </q-input>
          <q-slider dense v-model="orderForm.sellQuantity" :max="getBalance(baseCoinSymbol)"
                    class="q-pa-sm" :step="0.0001" @mouseup="ensureSell"/>
          <q-field dense outlined class="form-item" readonly
                   hint="estimated (incl. 0.02% fee)"
                   :label="orderForm.sellQuantity ? coinsReceivedOnSell : ''">
            <template v-slot:prepend>
              <span class="text-caption" style="width: 7ch">Receive</span>
              <q-separator vertical class="q-mr-sm" />
            </template>
            <template v-slot:append>
              <span class="text-caption">{{ quoteCoinSymbol }}</span>
            </template>
          </q-field>
          <q-separator class="q-ma-sm" />
          <q-btn label="Sell" color="negative" class="full-width" dense type="submit" />
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
