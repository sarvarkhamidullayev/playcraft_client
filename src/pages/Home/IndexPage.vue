<template>
  <q-page>
    <CToolBar title="Asosiy sahifa"></CToolBar>
    <MobilePage v-if="$q.screen.lt.sm" />
    <DesktopPage v-else />
    <PaymentDialog />
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import PaymentDialog from "./PaymentDialog.vue";
import MobilePage from "./Mobile/IndexPage.vue";
import DesktopPage from "./Desktop/IndexPage.vue";
import { useRoomStore } from "stores/room";
import { storeToRefs } from "pinia";

const { getMappedRooms } = storeToRefs(useRoomStore());
</script>
