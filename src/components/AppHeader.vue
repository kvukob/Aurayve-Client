<script setup lang="ts">
import { useAccountStore } from 'src/core/accounts/accountStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const accountStore = useAccountStore();
const isLoggedIn = computed(() => {
  return accountStore.getIsLoggedIn;
});
const logout = async function() {
  accountStore.setIsLoggedIn(false);
  accountStore.setToken('');
  window.localStorage.removeItem('token');
  await router.push('/');
};

onMounted(() => {
  const token = window.localStorage.getItem('token');
  if (token) {
    accountStore.setToken(token);
    accountStore.setIsLoggedIn(true);
  }
});
</script>

<template>
  <q-header class="bg-dark">
    <q-toolbar class="flex content-center ">
      <q-toolbar-title class="row items-center">
        <router-link to="/" class="row items-center">
          <q-icon name="las la-leaf" color="primary"/>
          <span class="gt-xs text-primary q-mr-md">Aurayve</span>
        </router-link>
        <q-btn label="Faucet" no-caps :to="{name: 'app.faucet'}" />
        <q-btn label="Trade" no-caps :to="{name: 'app.trade'}" />
      </q-toolbar-title>
      <div v-if="!isLoggedIn">
        <q-btn flat label="Login" :to="{name: 'login'}" no-caps>
        </q-btn>
        <q-btn label="Register" color="primary" :to="{name: 'initiate.register.account'}" no-caps />
      </div>
      <div v-if="isLoggedIn">
        <q-btn flat :to="{name: 'app.wallet'}" label="Wallet" no-caps />
        <q-btn flat icon="las la-user-circle" no-caps>
          <q-menu style="width: 200px; box-shadow: none; border-left: 1px var(--q-primary) dotted">
            <q-item clickable v-close-popup :to="{name: 'app.account'}">
              <q-item-section avatar>
                <q-icon name="las la-user" />
              </q-item-section>
              <q-item-section>
                Account
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{name: 'support'}">
              <q-item-section avatar>
                <q-icon name="las la-question-circle"  />
              </q-item-section>
              <q-item-section>
                Support
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section avatar>
                <q-icon name="las la-sign-out-alt" color="negative" />
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>

</style>
