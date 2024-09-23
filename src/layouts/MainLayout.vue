<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>
    <drawer-menu></drawer-menu>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import DrawerMenu from "components/DrawerMenu.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    DrawerMenu,
  },
  setup() {
    return {};
  },
});
</script>
