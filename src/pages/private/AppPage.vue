<script setup lang="ts">
import { onMounted } from 'vue';
import hub from 'src/util/api/hub';

onMounted(async () => {
  await hub.walletHub.getWallet();
});
</script>

<template>
  <q-page class="row justify-center q-pt-xl">
    app logged in
  </q-page>
</template>

<style scoped>

</style>
