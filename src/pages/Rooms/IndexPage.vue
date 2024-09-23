<template>
  <q-page class="bg-accent">
    <CToolBar title="Xonalar">
      <template v-slot:right>
        <q-btn flat dense round icon="add" @click="openDialog('create')" />
      </template>
    </CToolBar>
    <RoomDialog title="Play Station" />
    <MobilePage v-if="$q.screen.lt.sm" />
    <DesktopPage v-else />
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import { useRoomStore } from "stores/room";
import RoomDialog from "pages/Rooms/RoomDialog.vue";
import DesktopPage from "./Desktop/IndexPage.vue";
import MobilePage from "./Mobile/IndexPage.vue";

const { openDialog } = useRoomStore();
</script>
