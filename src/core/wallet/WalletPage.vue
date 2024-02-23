<script setup lang="ts">
import WalletTable from 'src/core/wallet/WalletTable.vue';
import hub from 'src/util/api/hub';
import { onMounted } from 'vue';


onMounted(async () => {
  await hub.walletHub.getWallet();
});

</script>

<template>
  <q-page>
    <div class="row justify-center">
      <q-card flat class="rounded col-12 col-sm-8 q-mt-xl">
        <q-card-section>
          <WalletTable />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>

</style>
