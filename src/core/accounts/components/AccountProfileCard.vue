<script setup lang="ts">
import { useAccountStore } from 'src/core/accounts/accountStore';
import { computed,  ref } from 'vue';
import SetUsernameCard from 'src/core/accounts/components/SetUsernameCard.vue';
import AurBtn from 'components/PrimaryButton.vue';

const accountStore = useAccountStore();
const username = computed(() => {
  return accountStore.getUsername;
});
const usernameDialog = ref(false);
</script>

<template>
  <q-card flat class="full-width">
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
              <q-chip outline text-color="secondary" square class="text-overline row text-bold">{{ username }}</q-chip>
            </q-item-label>
            <q-item-label caption>
              Your username will be displayed publicly when doing certain actions.
            </q-item-label>
          </q-item-section>
          <q-item-section side class="gt-xs">
            <AurBtn @click="usernameDialog = true" label="Set"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>

  <q-dialog v-model="usernameDialog" persistent>
    <SetUsernameCard @closeDialog="usernameDialog = false" />
  </q-dialog>
</template>

<style scoped>

</style>
