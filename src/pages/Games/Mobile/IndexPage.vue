<template>
  <q-scroll-area
    v-if="allGames.length > 0"
    class="bg-accent q-py-sm"
    style="height: calc(100vh - 64px)"
  >
    <q-list separator>
      <q-item clickable v-for="(item, idx) in allGames" :key="item">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ idx + 1 }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold text-subtitle1 text-primary">{{
            item.title
          }}</q-item-label>
          <q-item-label caption class="text-subtitle2 text-primary">{{
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
    style="height: calc(100vh - 64px)"
    class="column bg-accent flex flex-center text-grey-5 text-h6"
  >
    <div>O'yinlar mavjud emas</div>
    <q-icon name="warning" color="grey-5" size="70px" />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useGameStore } from "src/stores/game";
const { allGames } = storeToRefs(useGameStore());
const { openDialog, deleteItem } = useGameStore();
</script>
