<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import fetcher from 'src/util/api/fetcher';
import routes from 'src/util/api/fetcher/routes';
import AurBtn from 'components/PrimaryButton.vue';

const coinARZ = ref({});

onMounted(async () => {
  let res = await fetcher.getData(routes.coin.getDetails + 'ARZ');
  coinARZ.value = res.data.coin;
});

const circulatingSupply = computed(() => {
  return Math.round(coinARZ.value.circulatingSupply);
});

const maxSupply = computed(() => {
  return coinARZ.value.maxSupply;
});

const supplyPercent = computed(() => {
  return ((circulatingSupply.value / maxSupply.value) * 100).toPrecision(2);
});

</script>

<template>
  <q-card class="rounded card bg-transparent">
    <q-card-section>
      <div class="column items-center">
        <q-icon name="las la-coins" size="64px" />
        <div class="text-h4 row items-center">
          {{ circulatingSupply }} / {{ maxSupply }}
          <span class="text-h5 q-ml-md">
            ({{ supplyPercent }}%)
          </span>
        </div>
        <div class="text-body1">
          {{ coinARZ.symbol }} has been released
        </div>
      </div>
    </q-card-section>
    <div class="row justify-center q-ma-lg">
      <q-icon name="las la-ellipsis-v" size="lg" color="accent"/>
    </div>
    <q-card-section class="col-md-6 text-center">
      <div class="text-h4">ARZ?</div>
      <span class="text-body2">
        Aurizen (ARZ) is the our native coin. We're giving it all away through our faucet.
      </span>
    </q-card-section>
    <q-card-actions class="row justify-center">
      <AurBtn label="Get some of your own" :to="{name: 'app.faucet'}" />
    </q-card-actions>
  </q-card>
</template>

<style>


</style>
