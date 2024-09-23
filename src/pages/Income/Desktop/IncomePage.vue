<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="income.products"
      :columns="cols"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-left>
        <FilterProducts></FilterProducts>
      </template>
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="add"
          label="Yakunlash"
          no-caps
          @click="createItem()"
        />
      </template>
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            color="primary"
            flat
            round
            dense
            icon="edit"
            @click="openDialog(props.row)"
          />
          <q-btn
            color="red-4"
            flat
            round
            dense
            icon="delete"
            @click="deleteFromCart(props.row.idx)"
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

    <ProductDialog />
  </div>
</template>
<script setup>
import ProductDialog from "../Components/ProductDialog.vue";
import FilterProducts from "../Components/FilterProducts.vue";
import { storeToRefs } from "pinia";
import { tableCols } from "src/composables/tableColumns";
import { useIncomeStore } from "src/stores/income";

const cols = tableCols().incomeProducts;
const { income } = storeToRefs(useIncomeStore());
const { createItem, deleteFromCart, openDialog } = useIncomeStore();
</script>
