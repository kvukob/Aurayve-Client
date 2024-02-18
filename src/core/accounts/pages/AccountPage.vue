<script setup lang="ts">
import AccountDetailsCard from 'src/core/accounts/components/AccountDetailsCard.vue';
import AccountSecurityCard from 'src/core/accounts/components/AccountSecurityCard.vue';
import AccountDangerCard from 'src/core/accounts/components/AccountDangerCard.vue';
import AccountProfileCard from 'src/core/accounts/components/AccountProfileCard.vue';


</script>

<template>
  <q-page>
    <div class="row justify-center">
      <q-card flat class="rounded col-12 col-sm-10" >
        <q-card-section>
          <AccountDetailsCard  />
          <AccountProfileCard  />
          <AccountSecurityCard />
          <AccountDangerCard />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>

</style>
