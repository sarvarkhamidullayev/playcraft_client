<template>
  <div class="q-pa-md">
    <q-table
      title="Mahsulotlar ro'yxati"
      style="height: calc(100vh - 96px)"
      :rows="room.products"
      :columns="cols"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-right>
        <FilterProducts></FilterProducts>
      </template>
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            color="red-4"
            flat
            round
            dense
            icon="delete"
            @click="handleDelete(props.row._id)"
          />
        </q-td>
        <q-td
          v-else-if="props.col.name === 'index'"
          class="text-left"
          style="width: 70px"
        >
          {{ props.value }}
        </q-td>
        <q-td
          v-else-if="props.col.name === 'quantity'"
          class="text-left"
          style="width: 70px"
        >
          {{ props.row.quantity }}
          <q-popup-edit v-model="props.row.quantity" v-slot="scope">
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>

        <q-td v-else>
          <div class="text-center">{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import FilterProducts from "../Components/FilterProducts.vue";
import { storeToRefs } from "pinia";
import { tableCols } from "src/composables/tableColumns";
import { useRoomStore } from "src/stores/room";
import { ref } from "vue";
import { useRoute } from "vue-router";
const cols = tableCols().homeProducts;
const { rooms, room } = storeToRefs(useRoomStore());

const route = useRoute();
const idx = route.params.idx;
room.value = ref({
  ...rooms.value[idx],
  idx: idx,
});

const handleDelete = (id) => {
  room.value.products.splice(
    room.value.products.findIndex((item) => item._id === id),
    1
  );
};
</script>
