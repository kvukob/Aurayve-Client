<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import CoinDetailsCard from 'components/CoinDetailsCard.vue';
import FAQCard from 'components/FAQCard.vue';
import AurBtn from 'components/PrimaryButton.vue';

const router = useRouter();


const form = ref({
  email: ''
});


async function onSubmit() {
  await router.push({ name: 'initiate.register.account', query: { email: form.value.email } });
};


</script>

<template>
  <q-page class="row items-center justify-center q-pt-xl">
    <div class="row col-md-9 items-center justify-center">
      <q-card flat class="rounded row col-lg-6 bg-transparent">
        <q-card-section>
          <q-card flat class="q-pa-lg bg-transparent">
            <q-card-section class="text-h2 heading-text">
              <div class="text-primary">
                Fantasy Markets,
              </div>
              <div class="text-bold">
                Real Opportunities
              </div>
              <div class="text-subtitle2 q-pt-lg">
                Your trades are more than transactions; they're chapters in your trading saga.
              </div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="onSubmit" class="row">
                <q-input outlined dense placeholder="Email" v-model="form.email" class="q-mr-sm"
                         style="width: 35ch" />
                <AurBtn type="submit" label="Sign up now" />
              </q-form>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <div class="col-lg-6 row">
        <q-chip class="text-h5">
          ARZ
          <span class="text-positive q-ml-md">+40%</span>
        </q-chip>
        <q-chip class="text-h5">
          GMBL
          <span class="text-positive q-ml-md">+13%</span>
        </q-chip>
        <q-chip class="text-h5">
          MEOW
          <span class="text-negative q-ml-md">-5%</span>
        </q-chip>
        <q-chip class="text-h5">
          TVEE
          <span class="text-positive q-ml-md">+13%</span>
        </q-chip>
        <q-chip class="text-h5">
          MMA
          <span class="text-negative q-ml-md">-5%</span>
        </q-chip>
        <q-chip class="text-h5">
          MMA
          <span class="text-negative q-ml-md">-5%</span>
        </q-chip>
        <q-chip class="text-h5">
          AURETH
          <span class="text-positive q-ml-md">+13%</span>
        </q-chip>
        <q-chip class="text-h5">
          AURBTC
          <span class="text-positive q-ml-md">+125%</span>
        </q-chip>
        <q-chip class="text-h5">
          AURDOGE
          <span class="text-negative q-ml-md">-35%</span>
        </q-chip>
        <q-chip class="text-h5">
          STOCK
          <span class="q-ml-md text-grey-5">0%</span>
        </q-chip>
      </div>
    </div>
    <div class="col-12" style="height: 25vh" />
    <div class="row justify-center col-12" >
      <div class="col-md-6 col-lg-6">
        <CoinDetailsCard />
      </div>
    </div>
    <div class="col-12" style="height: 25vh" />
    <div class="row justify-center col-12" v-if="true" >
      <q-card flat class="rounded col-md-6 col-lg-6 bg-transparent">
        <FAQCard />
      </q-card>
    </div>
    <div class="col-12" style="height: 25vh" />
    <div class="row justify-center  col-12 " >
      <div class="text-overline text-grey-5 absolute-bottom row justify-center ">
        <span>&copy;</span>2024
        Aurayve
      </div>
    </div>
  </q-page>
</template>
