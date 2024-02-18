<script setup lang="ts">
const props = defineProps(['message'])
</script>

<template>
  <div class="full-width info-box row">
    <div class="col-2">
      <q-icon name="las la-info-circle" size="32px" color="info" />
    </div>
    <div class="col-10 text-left row items-center text-weight-medium">
      {{ props.message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-box {
  border: $info dashed 1px;
  padding: 10px;
  margin: 5px;
}
</style>
