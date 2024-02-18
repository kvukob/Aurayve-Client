<script setup lang="ts">

</script>

<template>
  <q-card bordered flat class="full-width" style="border: 1px dashed var(--q-negative)">
    <q-card-section>
      <q-list padding>
        <q-item>
          <q-item-section avatar class="gt-xs">
            <q-icon name="las la-bomb" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1">Account Deletion</q-item-label>
            <q-item-label caption>
              Deleting your account is permanent. You cannot recover your account once deleted.
            </q-item-label>
            <q-btn outline color="negative" class="xs q-ma-sm full-width">Delete Account</q-btn>
          </q-item-section>
          <q-item-section side class="gt-xs">
            <q-btn  color="negative">Delete Account</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
