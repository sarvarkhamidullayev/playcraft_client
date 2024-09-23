<template>
  <div style="height: 64px" class="q-px-md">
    <q-input v-model="parsedDate" color="primary" style="font-size: 18px">
      <template v-slot:append>
        <q-icon name="event" color="primary" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date" range mask="DD.MM.YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useUtils } from "src/plugins/utils";
import { useUniversalStore } from "src/stores/universal-store";
import { storeToRefs } from "pinia";
import moment from "moment";

export default {
  setup() {
    const { date, parsedDate } = storeToRefs(useUniversalStore());
    return {
      date,
      parsedDate,
    };
  },
};
</script>
