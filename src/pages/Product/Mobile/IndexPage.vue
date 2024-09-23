<template>
  <q-select
    style="height: 60px"
    v-model="filter"
    :options="['Taomlar', 'Ichimliklar', 'Boshqalar']"
    label="Filter"
    emit-value
    map-options
    class="q-mx-md"
    behavior="menu"
    color="primary"
    clearable
  >
    <template v-slot:append>
      <q-icon color="primary" name="filter_alt" v-if="filter === ''" />
    </template>
  </q-select>
  <q-scroll-area
    v-if="getMappedProducts.length > 0"
    class="bg-accent q-py-sm"
    style="height: calc(100vh - 124px)"
  >
    <q-list separator>
      <q-item clickable v-for="item in getMappedProducts" :key="item">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ item.idx + 1 }}
          </q-avatar>
        </q-item-section>
        <q-item-section class="text-primary">
          <q-item-label class="text-weight-bold text-subtitle1">{{
            item.title
          }}</q-item-label>
          <q-item-label caption class="text-subtitle2">{{
            item.price
          }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="edit"
              @click="openDialog('update', item)"
            />
            <q-btn
              color="red-4"
              flat
              round
              dense
              icon="delete"
              @click="deleteItem(item._id, item.idx)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
  <div
    v-else
    style="height: calc(100vh - 124px)"
    class="column bg-accent flex flex-center text-grey-5 text-h6"
  >
    <div>Mahsulot mavjud emas</div>
    <q-icon name="warning" color="grey-5" size="70px" />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "src/stores/product";
const { getMappedProducts, filter } = storeToRefs(useProductStore());
const { deleteItem, openDialog } = useProductStore();
</script>
