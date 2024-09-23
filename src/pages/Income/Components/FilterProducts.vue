<template>
  <q-select
    clearable
    label="Mahsulotni tanlang"
    use-input
    hide-selected
    input-debounce="1000"
    v-model="filter"
    :options="options"
    style="width: 250px"
    @update:model-value="filterProducts($event)"
    @filter="filterFn"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          <q-btn
            no-caps
            color="primary"
            label="Mahsulot qo'shish"
            icon-right="add"
            @click="openDialog('create')"
          ></q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useIncomeStore } from "src/stores/income";
import { useProductStore } from "src/stores/product";
import { ref } from "vue";

const { filter } = storeToRefs(useIncomeStore());
const { filterProducts } = useIncomeStore();
const { getMappedProducts } = storeToRefs(useProductStore());
const { openDialog } = useProductStore();
const options = ref(getMappedProducts.value);

function filterFn(val, update, abort) {
  update(() => {
    if (val === "") {
      options.value = getMappedProducts.value;
    } else {
      const needle = val.toLowerCase();
      options.value = getMappedProducts.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
}
</script>
