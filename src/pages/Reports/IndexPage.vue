<template>
  <q-page class="bg-accent">
    <CToolBar title="Reports">
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
        class="q-px-sm q-pb-sm bg-accent"
        :thumb-style="{ width: '5px' }"
        style="height: calc(100vh - 64px)"
      >
        <q-card class="text-center bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section class="q-py-sm">
            <div class="text-h6">Umumiy tushumlar</div>
          </q-card-section>
          <div class="text-h2 text-bold">
            <Vue3autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="totals.total"
              :duration="1"
              :decimals="0"
              :autoinit="true"
            />
          </div>
          <q-card-section>
            <div class="row justify-between text-subtitle1">
              <div>Play station:</div>
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="totals.totalSumPS"
                suffix=" so'm"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
            <div class="row justify-between text-subtitle1">
              <div>Mahsulotlar:</div>
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="totals.totalSumProducts"
                suffix=" so'm"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card class="bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section class="q-py-sm">
            <div class="text-h6">Play station</div>
          </q-card-section>
          <q-card-section class="q-py-sm" v-if="playStations.length > 0">
            <q-scroll-area style="height: 300px">
              <q-intersection
                v-for="item in playStations"
                :key="item._id"
                transition="scale"
                class="example-item"
              >
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label>
                      <div class="row justify-between">
                        <div>{{ item.title }}</div>
                        <div>{{ formatNumber(item.totalSum) }} so'm</div>
                      </div>
                    </q-item-label>
                    <q-item-label
                      caption
                      class="text-grey text-subtitle2"
                      lines="1"
                    >
                      <div class="row justify-between text-primary">
                        <div>Jami vaqti:</div>
                        <div>
                          {{ convertMinutesToHours(item.totalDuration) }} soat
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-intersection>
            </q-scroll-area>
          </q-card-section>
          <div v-else style="height: 150px" class="flex flex-center">
            Hozircha ma'lumot yo'q
          </div>
        </q-card>
        <q-card class="bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section class="q-py-sm">
            <div class="text-h6">Mahsulotlar</div>
          </q-card-section>
          <q-card-section class="q-py-sm" v-if="products.length > 0">
            <q-scroll-area style="height: 300px">
              <q-intersection
                v-for="item in products"
                :key="item._id"
                transition="scale"
                class="example-item"
              >
                <q-item class="q-pa-none">
                  <q-item-section>
                    <q-item-label>
                      <div class="row justify-between">
                        <div>{{ item.title }}</div>
                        <div>{{ formatNumber(item.totalSum) }} so'm</div>
                      </div>
                    </q-item-label>
                    <q-item-label
                      caption
                      class="text-grey text-subtitle2"
                      lines="1"
                    >
                      <div class="row justify-between text-primary">
                        <div>Jami sotilgan soni:</div>
                        <div>{{ formatNumber(item.quantity) }} dona</div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-intersection>
            </q-scroll-area>
          </q-card-section>
          <div v-else style="height: 150px" class="flex flex-center">
            Hozircha ma'lumot yo'q
          </div>
        </q-card>
        <q-card class="bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section class="q-py-sm">
            <div class="text-h6">Xarajatlar</div>
          </q-card-section>
          <q-card-section class="q-py-sm" v-if="expenses.length > 0">
            <q-scroll-area style="height: 300px">
              <q-intersection
                v-for="item in expenses"
                :key="item._id"
                transition="scale"
                class="example-item"
              >
                <q-item class="q-pa-none">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>
                      <div>{{ item.description }}</div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-primary text-subtitle2">
                      {{ formatNumber(item.amount) }} so'm
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-intersection>
            </q-scroll-area>
          </q-card-section>
          <div v-else style="height: 150px" class="flex flex-center">
            Hozircha ma'lumot yo'q
          </div>
        </q-card>
        <q-card class="bg-accent text-primary q-mt-sm q-mx-xs">
          <q-card-section class="q-py-sm text-center">
            <div class="text-h5">Foyda</div>
            <div class="text-h2 text-bold">
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="profits.totalProfit"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
          </q-card-section>
          <q-card-section class="q-py-sm text-center">
            <div class="row justify-between text-subtitle1">
              <div>Play station dan:</div>
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="profits.totalSumPS"
                suffix=" so'm"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
            <div class="row justify-between text-subtitle1">
              <div>Mahsulotlar dan:</div>
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="profits.totalProductsProfit"
                suffix=" so'm"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
            <div class="row justify-between text-subtitle1">
              <div>Xarajatlar:</div>
              <Vue3autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="totals.expenses"
                suffix=" so'm"
                :duration="1"
                :decimals="0"
                :autoinit="true"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
/* eslint-disable */
import CToolBar from "src/components/CToolBar.vue";
import { onMounted } from "vue";
import datesLocale from "src/composables/datesLocale";
import { useUniversalStore } from "src/stores/universal-store";
import { storeToRefs } from "pinia";
import { useUtils } from "src/plugins/utils";
import { useReportsStore } from "src/stores/reports";
import Vue3autocounter from "vue3-autocounter";

const { getReports } = useReportsStore();
const { totals, playStations, products, profits, expenses } = storeToRefs(
  useReportsStore()
);
const { formatNumber, convertMinutesToHours } = useUtils();
const { parsedDate, date } = storeToRefs(useUniversalStore());
onMounted(async () => {
  await getReports(parsedDate.value);
});
</script>

<style scoped>
.example-item {
  height: 50px;
}
</style>
