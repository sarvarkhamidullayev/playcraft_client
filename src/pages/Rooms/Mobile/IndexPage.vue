<template>
  <q-select
    style="height: 60px"
    v-model="filter"
    :options="getRoomsGames"
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
    v-if="allRooms.length > 0"
    class="bg-accent"
    style="height: calc(100vh - 128px)"
  >
    <q-list separator>
      <q-item
        class="text-primary"
        clickable
        v-for="(item, idx) in allRooms"
        :key="item"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ idx + 1 }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold text-h6"
            >{{ item.title }} - xona</q-item-label
          >
          <q-item-label caption class="text-subtitle1">{{
            item.game.label
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
              @click="handleUpdate(item)"
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
    style="height: calc(100vh - 128px)"
    class="column bg-accent flex flex-center text-grey-5 text-h6"
  >
    <div>Xonalar mavjud emas</div>
    <q-icon name="warning" color="grey-5" size="70px" />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useRoomStore } from "src/stores/room";
const { allRooms, getRoomsGames, filter, room } = storeToRefs(useRoomStore());
const { openDialog, deleteItem } = useRoomStore();
const $q = useQuasar();
const handleUpdate = (item) => {
  room.value = item;
  openDialog("update", item);
};
</script>
