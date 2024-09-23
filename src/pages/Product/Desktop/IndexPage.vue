<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="getMappedProducts"
      :columns="cols"
      row-key="name"
      title="Mahsulot ma'lumotlari"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-right>
        <q-select
          clearable
          label="Filter"
          v-model="filter"
          :options="filterOptions"
          style="width: 250px"
        >
          <template v-slot:prepend>
            <q-icon name="filter_alt" />
          </template>
        </q-select>
      </template>
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
            @click="deleteItem(props.row._id, props.row.idx)"
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
import { tableCols } from "src/composables/tableColumns";
import { useProductStore } from "src/stores/product";
const cols = tableCols().products;
const filterOptions = ["Taomlar", "Ichimliklar", "Boshqalar"];

const { getMappedProducts, filter } = storeToRefs(useProductStore());
const { openDialog, deleteItem } = useProductStore();
</script>
