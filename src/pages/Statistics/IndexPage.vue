<template>
  <q-page class="bg-accent">
    <CToolBar title="Statistika">
      <template #right>
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
    <div>
      <q-scroll-area
        class="q-px-sm q-pb-lg bg-accent"
        :thumb-style="{ width: '5px' }"
        style="height: calc(100vh - 64px)"
      >
        <CardPage />
        <q-card class="bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section>
            <div class="text-h6">Буюртмалар статистикаси</div>
          </q-card-section>
          <q-card-section>
            <line-chart
              legend="bottom"
              :width="'100%'"
              height="calc(100vh - 334px)"
              :colors="['orange', 'green']"
              :data="yearlyOrders.chartData"
            ></line-chart>
          </q-card-section>
        </q-card>
        <div class="row">
          <div class="col-xs-12 col-md-6 col-6">
            <q-card
              class="bg-accent shadow-1 text-primary q-mt-sm q-mx-xs"
              dark
              style="height: 550px"
            >
              <q-card-section>
                <div class="text-h6 text-center">Umumiy tushumlar</div>
              </q-card-section>
              <q-card-section>
                <pie-chart
                  :colors="['orange', 'green']"
                  :legend="false"
                  :donut="true"
                  :data="pieChartData"
                ></pie-chart>
              </q-card-section>
              <q-card-section>
                <div class="row q-py-sm">
                  <div class="col-xs-10 col-md-10 row">
                    <div class="col-xs-2 col-md-2">
                      <q-avatar size="xs" color="orange"></q-avatar>
                    </div>
                    <div class="col-xs-10 col-md-10">Play station</div>
                  </div>
                  <div class="col-xs-2 col-md-2">
                    {{
                      formatNumber(
                        getTotalSumOfOrders.totalPSSum.amount.toFixed(0)
                      )
                    }}
                  </div>
                </div>
                <div class="row q-py-sm">
                  <div class="col-xs-10 col-md-10 row">
                    <div class="col-xs-2 col-md-2">
                      <q-avatar size="xs" color="green"></q-avatar>
                    </div>
                    <div class="col-xs-10 col-md-10">Mahsulotlar</div>
                  </div>
                  <div class="col-xs-2 col-md-2">
                    {{
                      formatNumber(
                        getTotalSumOfOrders.totalProductPrice.amount.toFixed(0)
                      )
                    }}
                  </div>
                </div>
                <div class="row q-py-sm">
                  <div class="col-xs-10 col-md-10 row">
                    <div class="col-xs-2 col-md-2">
                      <q-avatar size="xs" color="transparent"></q-avatar>
                    </div>
                    <div class="col-xs-10 col-md-10">Jami:</div>
                  </div>
                  <div class="col-xs-2 col-md-2">
                    {{ formatNumber(getTotalSumOfOrders.total.amount) }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-md-6 col-6">
            <q-card
              class="bg-accent shadow-1 text-primary q-mt-sm q-mx-xs"
              dark
              style="height: 550px"
            >
              <q-card-section>
                <div class="text-h6 q-mb-lg text-center">Топ сотувлар</div>
                <div class="row q-my-sm">
                  <div class="col-xs-2 col-md-2 text-center">№</div>
                  <div class="col-xs-7 col-md-7">Номланиши</div>
                  <div class="col-xs-3 col-md-3 text-center">Микдори</div>
                </div>
                <q-scroll-area
                  style="height: 424px"
                  :thumb-style="{ width: '5px' }"
                >
                  <template v-for="(item, i) in topProducts" :key="i">
                    <div class="row q-py-md">
                      <div class="col-xs-2 col-md-2 text-center">
                        {{ i + 1 }}
                      </div>
                      <div class="col-xs-7 col-md-7">{{ item.title }}</div>
                      <div class="col-xs-3 col-md-3 text-center">
                        {{ item.quantity }}
                      </div>
                    </div>
                    <q-separator color="accent" class="q-mx-sm" />
                  </template>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, computed } from "vue";
import { useStatisticStore } from "src/stores/statistic";
import CardPage from "src/components/CardPage.vue";
import CToolBar from "src/components/CToolBar.vue";
import DateInput from "src/components/DateInput.vue";
import { onMounted } from "vue";
import datesLocale from "src/composables/datesLocale";
import { useUniversalStore } from "src/stores/universal-store";
import { storeToRefs } from "pinia";
import { useUtils } from "src/plugins/utils";

export default defineComponent({
  components: {
    CardPage,
    CToolBar,
    DateInput,
  },
  setup() {
    const { getStatistics } = useStatisticStore();
    const { topProducts, yearlyOrders, getTotalSumOfOrders } = storeToRefs(
      useStatisticStore()
    );
    const { formatNumber } = useUtils();
    const { parsedDate, date } = storeToRefs(useUniversalStore());
    onMounted(async () => {
      await getStatistics(parsedDate.value);
    });
    const pieChartData = computed(() => {
      const total = getTotalSumOfOrders.value.total.amount;
      const percentPS = (
        (getTotalSumOfOrders.value.totalPSSum.amount * 100) /
        total
      ).toFixed(0);
      const percentProduct = (
        (getTotalSumOfOrders.value.totalProductPrice.amount * 100) /
        total
      ).toFixed(0);
      return [
        ["Play station", percentPS],
        ["Mahsulotlar", percentProduct],
      ];
    });
    console.log(getTotalSumOfOrders.value.totalPSSum.amount);
    return {
      parsedDate,
      date,
      datesLocale,
      formatNumber,
      yearlyOrders,
      topProducts,
      getTotalSumOfOrders,
      pieChartData,
    };
  },
});
</script>
