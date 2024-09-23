<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="allIncomes"
      :columns="cols"
      title="Kirimlar  ma'lumotlari"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="add"
          label="Yangi kirim"
          no-caps
          to="/new-income"
        />
      </template>
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="open_in_new"
            @click="openDialog('update', props.row)"
          />
        </q-td>
        <q-td
          v-else-if="props.col.name === 'index'"
          class="text-left"
          style="width: 70px"
        >
          {{ props.value }}
        </q-td>
        <q-td v-else>
          <div class="text-center">{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { tableCols } from "src/composables/tableColumns";
import { useIncomeStore } from "src/stores/income";
const cols = tableCols().incomes;

const { allIncomes } = storeToRefs(useIncomeStore());

const $q = useQuasar();
const handleDelete = (id, idx) => {
  deleteItem(id, idx);
};
</script>
