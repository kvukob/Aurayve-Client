<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { defineEmits } from 'vue';
import { useAccountStore } from 'src/core/accounts/accountStore';

const emit = defineEmits<{
  (e: 'close'): void
}>();

const accountStore = useAccountStore();

const chat = ref({
  message: ''
});
const closeChatBox = function() {
  emit('close');
};

const scrollToBottom = function() {
  const objDiv = document.getElementById('chat-area');
  if (objDiv)
    objDiv.scrollTop = objDiv.scrollHeight;
};

const hasUsername = computed(() => {
  return accountStore.getUsername;
});

onMounted(() => {
  scrollToBottom();
});

</script>

<template>
  <q-card flat class="rounded bg-transparent aur-chat-box">
    <q-card-section>
      <q-card flat style="max-height: 400px;" bordered>
        <q-card-section class="row justify-end q-pa-none">
          <q-btn icon="las la-window-close" dense square flat color="secondary" @click="closeChatBox" />
        </q-card-section>
        <q-card-section style="overflow-y: auto; height: 300px" id="chat-area" class="q-pa-none">
          <q-list dense>
            <q-item class="column">
              <q-item-section class="text-caption text-grey-5">
                <div class="row items-center">
                  <q-icon name="las la-user" color="primary" size="xs" />
                  civvo123
                </div>
              </q-item-section>
              <q-item-section class="text-caption">
                Chat lolook nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat
                lolook
                nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat lolook nerds
                what
                Chat lolook nerds what nerds whatnerds!
              </q-item-section>
            </q-item>
            <q-item class="column">
              <q-item-section class="text-caption text-grey-5">
                <div class="row items-center">
                  <q-icon name="las la-user" color="primary" size="xs" />
                  moonteller
                </div>
              </q-item-section>
              <q-item-section class="text-caption">
                Chat lolook nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat
                lolook
                nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat lolook nerds
                what
                Chat lolook nerds what nerds whatnerds!
              </q-item-section>
            </q-item>
            <q-item class="column">
              <q-item-section class="text-caption text-grey-5">
                <div class="row items-center">
                  <q-icon name="las la-user" color="primary" size="xs" />
                  catdog34
                </div>
              </q-item-section>
              <q-item-section class="text-caption">
                Chat lolook nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat
                lolook
                nerds what you gonna do cats and dogs and cows its raining or snowing who even cares?Chat lolook nerds
                what
                Chat lolook nerds what nerds whatnerds!
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <q-input v-model="chat.message" outlined dense maxlength="255" v-if="hasUsername">
            <template v-slot:append>
              <q-icon name="las la-paper-plane" />
            </template>
          </q-input>
          <q-btn label="Set Username" class="full-width" color="primary" no-caps v-if="!hasUsername" />
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.aur-chat-box {

  width: 320px;

  /* width */

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: var(--q-dark);
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: var(--q-primary);
    border-radius: 25px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: var(--q-primary);
  }
}
</style>
