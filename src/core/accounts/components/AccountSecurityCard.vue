<script setup lang="ts">
import AurBtn from 'components/PrimaryButton.vue';
</script>

<template>
  <q-card flat class="full-width">
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
            <q-btn outline color="secondary" class="xs q-ma-sm full-width">Change</q-btn>
          </q-item-section>
          <q-item-section side class="gt-xs">
            <AurBtn label="Change" :to="{name: 'app.account.change.email'}"/>
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
          <q-item-section side class="gt-xs">
            <AurBtn label="Change" :to="{name: 'app.account.change.password'}"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
