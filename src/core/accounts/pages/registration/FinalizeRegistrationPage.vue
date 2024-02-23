<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AccountRepository from 'src/core/accounts/accountRepository';
import AurBtn from 'components/PrimaryButton.vue';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
  serverError: false,
  serverMessage: '',
  error: false,
  verificationCode: '',
  loading: false
});

onMounted(() => {
  const route = useRoute();
  form.value.verificationCode = route.query.code as string;
  form.value.email = route.query.email as string;
});

async function onSubmit() {
  form.value.loading = true;
  const accountRepository = new AccountRepository();
  const errorResponse = await accountRepository.finalize(form.value.email, form.value.verificationCode, form.value.password);
  if (errorResponse) {
    form.value.serverError = true;
    form.value.error = true;
    form.value.serverMessage = errorResponse.message;
  } else {
    const loginRes = await accountRepository.login(form.value.email, form.value.password);
    if (loginRes) {
      console.log('login failed somehow?');
    } else {
      await router.push({ name: 'app.dashboard' });
    }
  }
  form.value.loading = false;
}
</script>

<template>
  <q-page class="row justify-center items-center ">
    <q-card class="col-sm-8 col-md-6 col-lg-3 card rounded">
      <q-card-section>
        <div class="row justify-center">
          <q-icon name="las la-lock" size="xl" />
        </div>
        <p class="text-h5 text-center">Create Your Password</p>
        <q-form @submit="onSubmit">
          <label>Password</label>
          <q-input outlined v-model="form.password" type="password" />
          <q-card flat bordered v-if="form.serverError" class="q-mt-sm">
            <q-card-section class="text-negative text-caption">
              <q-icon name="las la-exclamation-circle" size="md" />
              {{ form.serverMessage }}
            </q-card-section>
          </q-card>
          <AurBtn class="full-width q-mt-md" type="submit" label="Finish" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>
