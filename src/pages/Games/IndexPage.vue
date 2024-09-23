<template>
  <q-page>
    <CToolBar title="O'yinlar">
      <template v-slot:right>
        <q-btn flat dense round icon="add" @click="openDialog('create')" />
      </template>
    </CToolBar>
    <!-- <PSDialog title="Play Station" /> -->
    <MobilePage v-if="$q.screen.lt.sm" />
    <DesktopPage v-else />
    <GameDialog />
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import DesktopPage from "./Desktop/IndexPage.vue";
import MobilePage from "./Mobile/IndexPage.vue";
import GameDialog from "./GameDialog.vue";
import { useGameStore } from "src/stores/game";

const { openDialog } = useGameStore();
</script>
