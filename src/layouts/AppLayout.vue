<script setup lang="ts">
import AppHeader from 'components/AppHeader.vue';

/*
const route = useRoute();
const isBackgroundEnabled = computed(() => {
  const allowedRouteNames = ['', 'login', 'initiate.register.account', 'verify.register.account', 'finalize.register.account'];
  const currentRouteName = route.name;
  return allowedRouteNames.includes(typeof currentRouteName === 'string' ? currentRouteName : '');
});
*/
const isBackgroundEnabled = true;


</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader  />
    <q-page-container :class="isBackgroundEnabled ? 'svgBackground' : ''">
      <div class="background-video" v-if="false">
        <video autoplay muted loop preload="auto" id="bgVideo">
          <source src="/src/assets/outp3ut.webm" type="video/webm">
        </video>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>

a:visited {
  color: inherit;
}



</style>
