<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import AccountRepository from 'src/core/accounts/accountRepository';
import { getCssVar } from 'quasar';

const accountRepository = new AccountRepository();


const emit = defineEmits<{
  (e: 'closeDialog'): void
}>();


const form = ref({
  username: '',
  loading: false
});

const submitForm = async function() {
  form.value.loading = true;
  const res = await accountRepository.setUsername(form.value.username);
  if (res.success) {
    emit('closeDialog');
  }
  form.value.loading = false;
};


</script>

<template>
  <q-card flat class="rounded">
  <q-card-section>
    <q-form @submit="submitForm">
      <p class="text-h5 text-center q-ma-lg text-left">Set Username</p>
        <q-card-section flat>
          <label>Username</label>
          <q-input
            v-model="form.username"
            outlined
            dense
            maxlength="12"
            counter
            style="text-transform: lowercase;"
            lazy-rules
            :rules="[
            val => val && val.length > 0 || 'required'
          ]"
          />
        </q-card-section>
        <q-card-section
          flat
          class="text-subtitle2 row items-center justify-center q-ma-md"
          :style="{border: '1px dotted' + getCssVar('info')}"
        >
          Once set, your username cannot be changed.
        </q-card-section>
      <q-card-actions align="between">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn :loading="form.loading" label="Set" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
