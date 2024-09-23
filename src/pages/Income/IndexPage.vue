<template>
  <q-page class="bg-accent">
    <CToolBar title="Kirimlar">
      <template v-slot:right>
        <div>{{ parsedDate }}</div>
        <q-btn flat dense round icon="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="date"
              range
              mask="DD.MM.YYYY"
              :locale="datesLocale.uzc"
              first-day-of-week="1"
              today-btn
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Ёпиш" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </template>
    </CToolBar>
    <MobilePage v-if="$q.screen.lt.sm" />
    <DesktopPage v-else />
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import MobilePage from "./Mobile/IndexPage.vue";
import DesktopPage from "./Desktop/IndexPage.vue";
import { storeToRefs } from "pinia";
import { useUniversalStore } from "src/stores/universal-store";
import { useIncomeStore } from "src/stores/income";
import { onMounted } from "vue";
import datesLocale from "src/composables/datesLocale";

const { parsedDate, date } = storeToRefs(useUniversalStore());
const { getIncomes } = useIncomeStore();
onMounted(() => {
  getIncomes(parsedDate.value);
});
</script>
