<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import AccountRepository from 'src/core/accounts/accountRepository';
import { useRouter } from 'vue-router';

const router = useRouter();
const accountRepository = new AccountRepository();

const form = ref({
  newEmail: '',
  newEmailCode: '',
  newEmailCodeEnabled: true,
  newEmailCodeTimer: 120,
  currentEmailCode: '',
  currentEmailCodeEnabled: true,
  currentEmailCodeTimer: 120,
  errorMessage: ''
});

function setNewEmailCodeTimer(): void {
  let seconds = 119;

  const intervalId = setInterval(() => {
    // Update your variable here
    form.value.newEmailCodeTimer = seconds;

    // Decrease the countdown
    seconds--;

    // Check if the countdown has reached 0
    if (seconds < 0) {
      clearInterval(intervalId);
      // Optionally, you can perform additional actions when the countdown reaches 0
      form.value.newEmailCodeEnabled = true;
      form.value.newEmailCodeTimer = 120;
    }
  }, 1000); // Update every second
}

function setCurrentEmailCodeTimer(): void {
  let seconds = 119;

  const intervalId = setInterval(() => {
    // Update your variable here
    form.value.currentEmailCodeTimer = seconds;

    // Decrease the countdown
    seconds--;

    // Check if the countdown has reached 0
    if (seconds < 0) {
      clearInterval(intervalId);
      // Optionally, you can perform additional actions when the countdown reaches 0
      form.value.currentEmailCodeEnabled = true;
      form.value.currentEmailCodeTimer = 120;
    }
  }, 1000); // Update every second
}

const getCurrentEmailCode = async function() {
  form.value.currentEmailCodeEnabled = false;
  const emailSent = await accountRepository.getCurrentEmailCode();
  if (emailSent) {
    setCurrentEmailCodeTimer();
    Notify.create({
      message: 'Verification email sent!  Check your current email inbox and enter the code on this page.',
      icon: 'las la-check-square',
      iconColor: 'positive',
      position: 'bottom-right',
      group: false
    });
  }
};
const getNewEmailCode = async function() {
  form.value.newEmailCodeEnabled = false;
  const emailSent = await accountRepository.getNewEmailCode(form.value.newEmail);
  if (emailSent) {
    setNewEmailCodeTimer();
    Notify.create({
      message: 'Verification email sent!  Check your new email inbox and enter the code on this page.',
      icon: 'las la-check-square',
      iconColor: 'positive',
      position: 'bottom-right',
      group: false
    });
  }
};

const changeEmail = async function() {
  const res = await accountRepository.changeEmail(form.value.newEmail, form.value.newEmailCode, form.value.currentEmailCode);
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
            Account / Email Verification
          </span>
        </div>
      </div>
      <div class="col-12 col-sm-10 col-md-5 col-lg-3">
        <q-card flat class="rounded">
          <q-card-section>
            <q-card-section>
              <p class="text-h5 text-center">Change Email</p>
            </q-card-section>
            <q-form @submit="changeEmail">
              <q-card-section>
                <div class="q-ma-lg">
                  <label>New Email</label>
                  <q-input class="form-item"
                           outlined dense type="email"
                           v-model="form.newEmail" />
                </div>
                <div class="q-ma-lg">
                  <label>New Email Verification Code</label>
                  <q-input hint="Code sent to your new email"
                           class="form-item"
                           outlined dense
                           v-model="form.newEmailCode" mask="######">

                    <template v-slot:after>
                      <q-btn style="min-width: 101px"
                             :label="!form.newEmailCodeEnabled ? form.newEmailCodeTimer : 'Get Code'" color="primary"

                             @click="getNewEmailCode"
                             :disable="!form.newEmailCodeEnabled || form.newEmail.length < 3" />
                    </template>
                  </q-input>
                </div>
                <div class="q-ma-lg">
                  <label>Current Email Verification Code</label>
                  <q-input hint="Code sent to your current email" class="form-item"
                           outlined dense
                           v-model="form.currentEmailCode" mask="######">
                    <template v-slot:after>
                      <q-btn style="min-width: 101px"
                             :label="!form.currentEmailCodeEnabled ? form.currentEmailCodeTimer : 'Get Code'"
                             color="primary " @click="getCurrentEmailCode" :disable="!form.currentEmailCodeEnabled" />
                    </template>
                  </q-input>
                </div>
              </q-card-section>
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
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

</template>

<style scoped>

</style>
