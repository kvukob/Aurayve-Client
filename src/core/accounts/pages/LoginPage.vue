<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AccountRepository from 'src/core/accounts/accountRepository';

const router = useRouter();

const form = ref({
  email: 'kvukob@gmail.com',
  password: 'q',
  serverError: false,
  serverMessage: '',
  error: false,
  passwordResetAlert: false,
  loading: false
});


async function login() {
  form.value.loading = true;
  const accountRepository = new AccountRepository();
  const res = await accountRepository.login(form.value.email, form.value.password);
  if (res) {
    form.value.serverError = true;
    form.value.error = true;
    form.value.serverMessage = res;
  } else {
    await router.push({ name: 'app' });
  }
  form.value.loading = false;
}

function popAlert() {
  form.value.passwordResetAlert = true;
}

</script>

<template>
  <q-page class="row justify-center items-center">
    <q-card  class="col-sm-8 col-md-6 col-lg-3 card">
      <q-card-section>
        <div class="text-h5 q-pb-xl text-center">Log In</div>
        <q-form @submit="login">
          <label>Email</label>
          <q-input class="q-mb-md" outlined v-model="form.email" dense type="email" :error="form.error"
                   hide-bottom-space
          />
          <label>Password</label>
          <q-input class="q-mb-md" outlined v-model="form.password" dense type="password" :error="form.error"
                   hide-bottom-space
          />
          <q-card flat bordered v-if="form.serverError" class="q-mt-sm">
            <q-card-section class="text-negative text-caption">
              <q-icon name="las la-exclamation-circle" size="md" />
              {{ form.serverMessage }}
            </q-card-section>
          </q-card>
          <q-btn class="full-width q-mt-md" color="primary" no-caps type="submit"  :loading="form.loading">
            <span>Next</span>
          </q-btn>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-btn class="text-secondary" flat no-caps dense @click="popAlert">Forgot password?</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="form.passwordResetAlert">
    <q-card flat bordered style="width: 320px" class="card text-center">
      <q-icon name="las la-envelope" size="xl" />
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>
      <q-card-section class="text-left">
        <q-form>
          <label>Email</label>
          <q-input class="q-mb-md" outlined v-model="form.email" dense type="email"
                   hide-bottom-space
          />
        </q-form>
      </q-card-section>
      <q-card-section class="q-pt-none">
        If an account with the provided address exists, an email will be sent with instructions on how to reset your
        password.
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-btn label="Cancel" v-close-popup />
        <q-btn label="Continue" color="primary" class="text-black" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>
