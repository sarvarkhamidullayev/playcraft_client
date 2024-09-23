<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="allGames"
      :columns="cols"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="edit"
            @click="openDialog('update', props.row)"
          />
          <q-btn
            color="red-4"
            flat
            round
            dense
            icon="delete"
            @click="handleDelete(props.row._id, props.row.idx)"
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
import { useGameStore } from "src/stores/game";
const cols = tableCols().games;

const { allGames } = storeToRefs(useGameStore());
const { openDialog, deleteItem } = useGameStore();

const $q = useQuasar();
const handleDelete = (id, idx) => {
  deleteItem(id, idx);
};
</script>
