<template>
  <q-page class="bg-accent">
    <CToolBar title="Kirimlar" :goBack="true"></CToolBar>
    <IncomePageDesktop v-if="$q.screen.gt.sm" />
    <IncomePageMobile v-else />
  </q-page>
</template>
<script setup>
import CToolBar from "src/components/CToolBar.vue";
import IncomePageDesktop from "./Desktop/IncomePage.vue";
import IncomePageMobile from "./Mobile/IncomePage.vue";
</script>
