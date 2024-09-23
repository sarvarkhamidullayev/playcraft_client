<template>
  <q-page class="bg-accent">
    <CToolBar title="Mahsulotlar">
      <template v-slot:right>
        <q-btn flat dense round icon="add" @click="openDialog('create')" />
      </template>
    </CToolBar>
    <MobilePage v-if="$q.screen.lt.sm" />
    <DesktopPage v-else />
    <ProductDialog title="Products" />
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import ProductDialog from "./ProductDialog.vue";
import { useProductStore } from "stores/product";
import MobilePage from "./Mobile/IndexPage.vue";
import DesktopPage from "./Desktop/IndexPage.vue";

const { openDialog } = useProductStore();
</script>
