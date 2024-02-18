<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AccountRepository from 'src/core/accounts/accountRepository';
import {  LoginHistoryItem } from 'src/core/accounts/types';
import { formatUTCDateToLocal } from 'src/util/utils';

const loginHistory = ref<LoginHistoryItem[]>();

onMounted(async () => {
  const accountRepository = new AccountRepository();
  loginHistory.value = await accountRepository.getLoginHistory();
});

const columns = [
  {
    name: 'timestamp',
    required: true,
    label: 'Timestamp',
    align: 'left',
    field: row => row.timestamp,
    format: val => `${formatUTCDateToLocal(val)}`,
    sortable: true
  },
  { name: 'ipAddress', align: 'left', label: 'IP Address', field: 'ipAddress', sortable: true },
  { name: 'location', align: 'left', label: 'Location', field: 'location', sortable: true },
  { name: 'device', align: 'right', label: 'Device', field: 'device' }
];

const rows = computed(() => {
  return loginHistory.value;
});

</script>

<template>
  <q-page class="column">
    <div class="row justify-center">
      <div class="col-12 row justify-center">
        <div class="col-8 row items-center q-pt-sm q-pb-sm">
          <span class="text-h5">
            <q-btn flat icon="las la-chevron-left" :to="{'name': 'app.account'}" color="primary"/>
            Account Activities / Login History
          </span>
        </div>
      </div>
      <div class="col-12 col-sm-8">
        <q-card flat class="bg-transparent">
          <q-card-section>
            <q-table
              flat
              title="Login History" :grid="$q.screen.lt.sm"
              :rows="rows"
              :columns="columns"
              row-key="timestamp"
              hide-pagination
              :rows-per-page-options="[30]"
            >
              <template v-slot:bottom-row>
                <q-tr>
                  <q-td colspan="100%" class="text-caption text-grey-5">
                    Only displays records of login history from the past 30 days
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
