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
  verificationCode: '',
  loading: false
});

onMounted(() => {
  const route = useRoute();
  form.value.verificationCode = route.query.code as string;
  form.value.email = route.query.email as string;
});

async function verifyRegistration() {
  form.value.loading = true;
  const accountRepository = new AccountRepository();
  const errorResponse = await accountRepository.verifyRegistration(form.value.email, form.value.verificationCode);
  if (errorResponse) {
    form.value.serverError = true;
    form.value.error = true;
    form.value.serverMessage = errorResponse.message;
  } else {
    await router.push({
      name: 'finalize.register.account',
      query: {
        email: form.value.email,
        code: form.value.verificationCode
      }
    });
  }
  form.value.loading = false;
}
</script>

<template>
  <q-page class="row justify-center items-center ">
    <q-card class="rounded col-sm-8 col-md-6 col-lg-3 card ">
      <q-card-section>
        <p>
          Thanks for signing up! We're happy you're here.
        </p>
        <p>
          An email has been sent to {{ form.email }} with instructions on verifying your email. Either copy the code and
          enter it below, or follow the link provided to finish creating your account.
        </p>
        <q-form @submit="verifyRegistration">
          <label>Verification Code</label>
          <q-input outlined v-model="form.verificationCode" />
          <q-card flat bordered v-if="form.serverError" class="q-mt-sm">
            <q-card-section class="text-negative text-caption">
              <q-icon name="las la-exclamation-circle" size="md" />
              {{ form.serverMessage }}
            </q-card-section>
          </q-card>
          <AurBtn :disabled="!form.verificationCode" class="full-width q-mt-md" type="submit" label="Next" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
</style>
