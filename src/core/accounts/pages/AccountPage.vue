<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AccountRepository from 'src/core/accounts/accountRepository';
import { useAccountStore } from 'src/core/accounts/accountStore';
import SetUsernameDialog from 'src/core/accounts/components/SetUsernameDialog.vue';
import PrimaryButton from 'components/PrimaryButton.vue';

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

const username = computed(() => {
  return accountStore.getUsername;
});
const usernameDialog = ref(false);

</script>

<template>
  <q-page>
    <div class="row justify-center">
      <q-card flat class="col-12 col-sm-10">
        <q-card-section>
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
                         color="primary"
                         flat
                         :to="{name: 'app.account.login.history'}" />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <div class="row">
            <q-card flat class="col-12 col-md-6">
              <q-card-section>
                <div class="text-h5 q-ma-lg">Profile</div>
                <q-separator />
                <q-list padding>
                  <q-item>
                    <q-item-section avatar class="gt-xs">
                      <q-icon name="las la-signature" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body1">Username</q-item-label>
                      <q-item-label v-if="username.length !== 0">
                        <q-chip outline text-color="secondary" square class="text-overline row text-bold">{{ username
                          }}
                        </q-chip>
                      </q-item-label>
                      <q-item-label caption>
                        Your username will be displayed publicly when doing certain actions.
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <PrimaryButton @click="usernameDialog = true" label="Set" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
            <q-card flat class="col-12 col-md-6">
              <q-card-section>
                <div class="text-h5 q-ma-lg">Security</div>
                <q-separator />
                <q-list padding>
                  <q-item>
                    <q-item-section avatar class="gt-xs">
                      <q-icon name="las la-envelope" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body1">Email</q-item-label>
                      <q-item-label caption>
                        Link your email address to your account for login and password recovery.
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <PrimaryButton label="Change" :to="{name: 'app.account.change.email'}" />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class="gt-xs">
                      <q-icon name="las la-lock" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body1">Login Password</q-item-label>
                      <q-item-label caption class="text-body1">
                        Increase your password strength to enhance account security.
                      </q-item-label>

                    </q-item-section>
                    <q-item-section side>
                      <PrimaryButton label="Change" :to="{name: 'app.account.change.password'}" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <q-dialog v-model="usernameDialog" persistent>
    <SetUsernameDialog @closeDialog="usernameDialog = false" />
  </q-dialog>
</template>

<style scoped>

</style>
