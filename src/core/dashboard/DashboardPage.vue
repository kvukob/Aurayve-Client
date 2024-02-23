<script setup lang="ts">
import { onMounted } from 'vue';
import hub from 'src/util/api/hub';

onMounted(async () => {
  await hub.walletHub.getWallet();
});
</script>

<template>
  <q-page class="row items-center justify-center">
    <span class="text-h1 text-grey-6">
      Dashboard
    </span>
  </q-page>
</template>

<style scoped>

</style>
