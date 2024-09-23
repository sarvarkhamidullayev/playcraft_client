<template>
  <q-page class="bg-accent">
    <CToolBar title="Mahsulot qo'shish" :go-back="true"> </CToolBar>
    <DesktopDetails v-if="$q.screen.gt.sm" />
    <MobileDetails v-else />
  </q-page>
</template>
<script setup>
import CToolBar from "src/components/CToolBar.vue";
import DesktopDetails from "./Desktop/DesktopDetails.vue";
import MobileDetails from "./Mobile/MobileDetails.vue";
</script>
