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
  </q-select>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "src/stores/product";
import { useRoomStore } from "src/stores/room";
import { ref } from "vue";

const { filter } = storeToRefs(useRoomStore());
const { filterProducts } = useRoomStore();
const { getMappedProducts } = storeToRefs(useProductStore());
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
