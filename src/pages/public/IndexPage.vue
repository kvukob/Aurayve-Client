<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import CoinDetailsCard from 'components/CoinDetailsCard.vue';
import FAQCard from 'components/FAQCard.vue';

const router = useRouter();


const form = ref({
  email: ''
});


async function register() {
  if (1 < 2)
    await router.push({ name: 'initiate.register.account', query: { email: form.value.email } });
  else {
    console.log('badform');
  }
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
              <q-form @submit="register()" class="row">
                <q-input outlined dense placeholder="Email" v-model="form.email" class="q-mr-sm"
                         style="width: 35ch" />
                <q-btn color="primary" no-caps type="submit">
                  <span>Sign up now</span>
                </q-btn>
              </q-form>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <q-card flat class="rounded col-lg-6">
        <CoinDetailsCard />
      </q-card>
    </div>
    <div class="row justify-center col-12" v-if="false">
      <q-card flat class="rounded col-md-6 col-lg-6 bg-transparent">
        <FAQCard />
      </q-card>
    </div>
    <div class="row justify-center absolute-bottom  ">
      <div class="text-overline text-grey-5 ">
        <span>&copy;</span>2024
        Aurayve
      </div>
    </div>
  </q-page>
</template>
