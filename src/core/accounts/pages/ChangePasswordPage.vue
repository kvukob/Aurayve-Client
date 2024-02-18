<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import AccountRepository from 'src/core/accounts/accountRepository';
import { useRouter } from 'vue-router';

const router = useRouter();
const accountRepository = new AccountRepository();

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  errorMessage: ''
});


const changePassword = async function() {
  const res = await accountRepository.changePassword(form.value.currentPassword, form.value.newPassword);
  if (res.success) {
    Notify.create({
      message: res.message,
      icon: 'las la-check-square',
      color: 'dark-page',
      iconColor: 'positive',
      position: 'bottom-right',
      group: false
    });
    await router.push({ name: 'app.account' });
  } else {
    form.value.errorMessage = res.message;
  }
};

</script>

<template>
  <q-page class="column">
    <div class="row justify-center items-center">
      <div class="col-12 row justify-center">
        <div class="col-8 row items-center q-pt-sm q-pb-sm">
          <span class="text-h5">
            <q-btn flat icon="las la-chevron-left" :to="{'name': 'app.account'}" color="primary" />
            Account / Password Verification
          </span>
        </div>
      </div>
      <div class="col-12 col-sm-10 col-md-5 col-lg-3">
        <q-card flat class="rounded">
          <q-card-section>
            <q-card-section>
              <p class="text-h5 text-center">Change Password</p>
            </q-card-section>
            <q-form @submit="changePassword">
              <q-card-section>
                <div class="q-ma-lg">
                  <label>Current Password</label>
                  <q-input
                    class="form-item"
                    outlined dense type="password"
                    v-model="form.currentPassword" />
                </div>
                <div class="q-ma-lg">
                  <label>New Password</label>
                  <q-input
                    class="form-item"
                    outlined dense type="password"
                    v-model="form.newPassword" />
                </div>
                <div class="q-ma-lg">
                  <label>Confrm New Password</label>
                  <q-input
                    class="form-item"
                    outlined dense type="password"
                    v-model="form.confirmNewPassword" />
                </div>

                <q-card flat bordered v-if="form.errorMessage" class="q-mt-sm">
                  <q-card-section class="text-negative text-caption">
                    <q-icon name="las la-exclamation-circle" size="md" />
                    {{ form.errorMessage }}
                  </q-card-section>
                </q-card>
                <q-card-actions align="between">
                  <q-btn flat label="Cancel" :to="{name:'app.account'}" />
                  <q-btn label="Confirm" color="primary" type="submit" />
                </q-card-actions>
              </q-card-section>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

</template>

<style scoped>

</style>
