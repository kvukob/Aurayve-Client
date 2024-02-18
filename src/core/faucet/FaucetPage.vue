<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAccountStore } from 'src/core/accounts/accountStore';
import InfoBox from 'components/InfoBox.vue';
import hub from 'src/util/api/hub';
import CreateFaucetPage from 'src/core/faucet/pages/CreateFaucetPage.vue';

const accountStore = useAccountStore();

const isLoggedIn = computed(() => {
  return accountStore.getIsLoggedIn;
});

const getImage = () => {
  return new URL('/src/assets/arz.png', import.meta.url).href;
};

const claimFaucet = async () => {
  await hub.faucetHub.claim();
};

const tab = ref("aurizen");

</script>

<template>
  <q-page class="column">
    <div class="row justify-center">
      <div class="col-2">
        <q-tabs  v-model="tab" active-color="primary"  no-caps align="left" vertical>
          <q-tab name="aurizen" label="Aurizen" />
          <q-tab name="user.faucets" label="Other" />
          <q-separator />
          <q-tab name="create.faucet" label="Create Faucet" />
        </q-tabs>
      </div>
      <div class="col-10">
        <q-tab-panels v-model="tab" >
          <q-tab-panel name="aurizen">
            <q-card flat>
              <q-card-section class="row justify-center">
                <q-img :src="getImage()" width="128px" />
              </q-card-section>
              <q-card-section class="column items-center">
                <span class="text-h5">Aurizen</span>
                <span>ARZ</span>
              </q-card-section>
              <q-card-section class="text-center">
                <p>
                  Aurizen is the native utility coin on Aurayve. You can trade it, stake it, use it to bet,
                  create your own coins, and more.
                </p>
                <p>
                  New Aurizen is created through this faucet leading to a fair chance at distribution.
                </p>
              </q-card-section>
              <q-separator />
              <q-card-section class="column items-center">
                <q-chip square icon="las la-coins">
                  Claim Amount: 1 ARZ
                </q-chip>
                <q-chip icon="las la-stopwatch">
                  Claim Frequency: Daily
                </q-chip>
              </q-card-section>
              <q-separator />
              <q-card-actions class="row justify-center">
                <q-btn no-caps color="primary" v-if="isLoggedIn" @click="claimFaucet()">
                  Claim Now
                </q-btn>
                <div>
                  <InfoBox message="You must be logged in to use the faucet." v-if="!isLoggedIn"/>
                </div>
              </q-card-actions>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="user.faucets">
            <q-card flat>
              <q-card-section class="text-center">
                There are no active user faucets.
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="create.faucet">
            <CreateFaucetPage />
          </q-tab-panel>
        </q-tab-panels>

      </div>
    </div>
    <div class="row justify-center">
      <div class="col-6">
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
</style>
