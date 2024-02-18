<script setup lang="ts">
import { useAccountStore } from 'src/core/accounts/accountStore';
import { onMounted, ref } from 'vue';
import AccountRepository from 'src/core/accounts/accountRepository';

const accountStore = useAccountStore();
const account = ref({
  maskedEmail: '',
  dateRegistered: '',
  lastLogin: ''
});

onMounted(async () => {
  const accountRepository = new AccountRepository();
  await accountRepository.getDetails();
  account.value.maskedEmail = accountStore.getMaskedEmail;
  account.value.dateRegistered = accountStore.getDateRegistered;
  account.value.lastLogin = accountStore.getLastLogin;
});
</script>

<template>
  <q-card flat>
    <q-card-section class="row">
      <div class="col-12 col-md-12 col-lg-1 column">
        <q-icon name="las la-user-circle" size="64px" />
      </div>
      <div class="col-12 col-md-6 col-lg-2 column q-pa-sm justify-between">
        <label class="text-grey-6">Account</label>
        <span>{{ account.maskedEmail }}</span>
      </div>
      <div class="col-12 col-md-6 col-lg-2 column q-pa-sm justify-between">
        <label class="text-grey-6">Sign up time</label>
        <span>{{ account.dateRegistered }}</span>
      </div>
      <div class="col-12 col-md-6 col-lg-2 column q-pa-sm justify-between">
        <label class="text-grey-6">Last Login</label>
        <div>
          {{ account.lastLogin }}
          <q-btn dense
                 icon="las la-history"
                 size="xs"
                 color="secondary"
                 flat
                 :to="{name: 'app.account.login.history'}" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
