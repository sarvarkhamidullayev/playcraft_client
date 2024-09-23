<template>
  <div class="row justify-between q-pa-sm">
    <div
      class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 q-gutter-sm q-gutter-y-md"
      v-for="card in getTotalSumOfOrders"
      :key="card.title"
    >
      <q-card clickable v-ripple class="bg-accent text-primary q-px-sm q-mb-sm">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2 ellipsis">{{ card.title }}</div>
              <div class="text-h6">{{ formatNumber(card.amount) }} so'm</div>
            </div>
            <div class="col-auto">
              <q-avatar
                :color="card.color"
                text-color="primary"
                :icon="card.icon"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator class="q-mx-md" color="grey-8" />
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2">
                {{ card.quantity }}{{ " " + card.measure }}
              </div>
            </div>
            <div class="col-auto"></div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useStatisticStore } from "src/stores/statistic";
import { useUtils } from "src/plugins/utils";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { formatNumber, getNumber } = useUtils();
    const { getTotalSumOfOrders } = storeToRefs(useStatisticStore());
    return { getTotalSumOfOrders, formatNumber, getNumber };
  },
});
</script>
