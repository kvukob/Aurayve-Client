<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWalletStore } from 'src/core/wallet/walletStore';

const walletStore = useWalletStore();

const form = ref({
  selectedCoin: '',
  depositAmount: ''
});
const wallet = computed(() => {
  return walletStore.getWallet;
});
const availableCoins = computed(() => {
  if (wallet.value.balances)
    return wallet.value.balances.map((balance: object) => balance.symbol);
  return [];
});
const getBalance = function(symbol: string) {
  if (form.value.selectedCoin) {
    const balance = wallet.value.balances.find((balance: object) => balance.symbol === symbol);
    return balance ? balance.quantity.toString() : 0;
  }
  return '0';
};
</script>

<template>
  <q-card flat>
    <q-card-section class="row">
      <q-form class="col-3">
        <label>Select Coin</label>
        <q-select class="form-item" :options="availableCoins" v-model="form.selectedCoin" outlined dense/>
        <label>Deposit Amount</label>
        <q-input class="form-item" v-model="form.depositAmount" outlined dense
                 :hint="getBalance(form.selectedCoin) + ' available'">
          <template v-slot:append>
            <span class="text-caption">
              {{ form.selectedCoin }}
            </span>
          </template>
        </q-input>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
