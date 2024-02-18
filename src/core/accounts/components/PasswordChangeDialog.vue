<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <div class="row justify-center">
        <q-icon name="las la-lock" size="xl" />
      </div>
      <p class="text-h5 text-center">Password Change</p>
      <q-separator class="q-ma-md" />
    </q-card-section>
    <q-card-section>
      <q-form>
        <label>Current Password</label>
        <q-input placeholder="Enter your current password" class="form-item" outlined dense type="password" v-model="form.currentPassword" />
        <label>New Password</label>
        <q-input placeholder="Enter your new password" class="form-item" outlined dense type="password" v-model="form.newPassword"></q-input>
        <label>Confirm New Password</label>
        <q-input placeholder="Enter your new password again" class="form-item" outlined dense type="password" v-model="form.confirmNewPassword"></q-input>
      </q-form>
    </q-card-section>
    <q-card-actions align="between">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn label="Confirm" color="primary text-black" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style scoped>

</style>
