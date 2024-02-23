<script setup lang="ts">

import FAQCard from 'components/FAQCard.vue';
</script>

<template>
  <q-page>
    <div class="row justify-center items-center">
      <div class="col-12 row justify-center">
        <div class="col-8 row items-center q-pt-sm q-pb-sm">
          <span class="text-h5">
            <q-btn flat icon="las la-chevron-left" @click="$router.go(-1)" color="primary" />
            Help Center
          </span>
        </div>
        <div class="col-12 col-sm-8">
          <FAQCard />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
