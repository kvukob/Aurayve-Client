<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AccountRepository from 'src/core/accounts/accountRepository';
import AurBtn from 'components/PrimaryButton.vue';
const router = useRouter();

const form = ref({
  email: '',
  serverError: false,
  serverMessage: '',
  error: false,
  loading: false
});

onMounted(() => {
  const route = useRoute();
  form.value.email = route.query.email as string;
});

async function onSubmit() {
  form.value.loading = true;
  const accountRepository = new AccountRepository();
  const errorResponse = await accountRepository.initializeRegistration(form.value.email);
  if (errorResponse) {
    form.value.serverError = true;
    form.value.error = true;
    form.value.serverMessage = errorResponse.message;
  } else {
    await router.push({ name: 'verify.register.account', query: {email: form.value.email}});
  }
  form.value.loading = false;
}
</script>

<template>
  <q-page class="row justify-center items-center ">
    <q-card  class="rounded col-sm-8 col-md-6 col-lg-3 card ">
      <q-card-section>
        <p class="text-h5 text-center">Create Account</p>
        <q-form @submit="onSubmit">
          <label>Email</label>
          <q-input required class="q-mb-md" outlined v-model="form.email" dense type="email" :error="form.error" hide-bottom-space
          />
          <p class="text-caption col-10">
            By creating an account, I agree to Aurayve's
            <router-link :to="{name: 'terms.and.conditions'}" target="_blank" style="text-decoration: underline">
              Terms and Conditions</router-link>.
          </p>
          <q-card flat bordered v-if="form.serverError" class="q-mt-sm">
            <q-card-section class="text-negative text-caption">
              <q-icon name="las la-exclamation-circle" size="md" />
              {{ form.serverMessage }}
            </q-card-section>
          </q-card>
          <AurBtn type="submit" :loading="form.loading" label="Next" class="full-width q-mt-md"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>
