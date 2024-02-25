<script setup lang="ts">
import AppHeader from 'components/AppHeader.vue';

// Background
// https://www.transparenttextures.com/dark-mosaic.html

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader  />
    <q-page-container
      style="
      background-image: url('src/assets/5.png');
      "
    >
      <div class="background-video" v-if="false">
        <video autoplay muted loop preload="auto" id="bgVideo">
          <source src="/src/assets/out3put.webm" type="video/webm">
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


.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
