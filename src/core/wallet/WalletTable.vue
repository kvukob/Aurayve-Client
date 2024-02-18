<script setup lang="ts">

import { useWalletStore } from 'src/core/wallet/walletStore';
import { computed } from 'vue';

const walletStore = useWalletStore();
const wallet = computed(() => {
  return walletStore.getWallet;
});

const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Coin',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Symbol', align: 'left', label: 'Symbol', field: 'symbol', sortable: true },
  { name: 'Quantity', align: 'left', label: 'Quantity', field: 'quantity', sortable: true }
];
const rows = computed(() => {
  return wallet.value.balances;
});


</script>

<template>
  <q-table
    flat
    title="Assets List"
    :rows="rows"
    :columns="columns"
    row-key="name"
    class="text-body1"
  >
    <template v-slot:no-data>
      <div class="full-width row flex-center q-ma-lg">
        <div class="column items-center">
          <p class="text-body1">You don't have any coins in your wallet, yet.</p>
          <q-btn color="primary" no-caps :to="{name: 'app.faucet'}">Claim Your First ARZ</q-btn>
        </div>
      </div>
    </template>
  </q-table>
</template>

<style scoped>

</style>
