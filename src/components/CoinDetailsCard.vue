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
  <q-card class="rounded card svgBackground" >
    <q-card-section class="row justify-between">
      <q-icon name="las la-coins" size="xl" />
      <div class="column items-center">
          <span class="text-h4">
            {{ circulatingSupply }} / {{ maxSupply }}
           {{ coinARZ.symbol }}
          </span>
        <span class="text-subtitle1 text-accent">
           {{ supplyPercent }}% has been released
          </span>
        <div class="q-pa-lg">
          <AurBtn label="Get some of your own" :to="{name: 'app.faucet'}" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="col-md-6">
      <div class="text-h4 text-accent">ARZ?</div>
      <p>
        Aurizen (ARZ) is the our native coin. We're giving it all away through our faucet.
      </p>
    </q-card-section>
  </q-card>
</template>

<style>


</style>
