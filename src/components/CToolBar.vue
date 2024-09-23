<template>
  <q-toolbar class="bg-primary text-white shadow-2" style="height: 64px">
    <q-btn
      v-if="!goBack"
      flat
      dense
      round
      icon="menu"
      @click="toggleLeftDrawer"
    ></q-btn>
    <q-btn
      v-else
      flat
      dense
      round
      icon="arrow_back"
      @click="$router.go(-1)"
    ></q-btn>
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
    <q-space />
    <slot name="right"></slot>
  </q-toolbar>
</template>

<script setup>
import { useUniversalStore } from "src/stores/universal-store";

const { toggleLeftDrawer } = useUniversalStore();
const props = defineProps({
  title: {
    type: String,
    default: "Home",
  },
  goBack: {
    type: Boolean,
    default: false,
  },
});

const handleDrawerMenu = () => {
  $q.drawer.toggle();
};
</script>
