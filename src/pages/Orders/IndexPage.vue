<template>
  <q-page class="bg-accent">
    <div>
      <CToolBar title="Orders"> </CToolBar>
      <DateInput />
      <q-scroll-area
        v-if="getMappedOrders.length > 0"
        class="bg-accent q-py-sm"
        style="height: calc(100vh - 192px)"
      >
        <q-list class="rounded-borders" separator>
          <q-expansion-item
            group="somegroup"
            v-for="(item, idx) in getMappedOrders"
            :key="item._id"
          >
            <template v-slot:header>
              <q-item-section class="text-primary">
                <div class="row">
                  <div class="text-bold q-mr-sm">{{ idx + 1 + ") " }}</div>
                  <div>{{ item.room }}</div>
                </div>
                <div class="text-subtitle2 text-grey-5">
                  {{ formatDateTime(item.date) }}
                </div>
                <div class="text-subtitle2 text-ellipsis text-grey-5">
                  {{
                    item.playStation.title +
                    " - " +
                    item.playStation.totalPSPrice.toFixed(0)
                  }}
                  so'm
                </div>
              </q-item-section>

              <q-item-section side>
                <q-chip
                  color="primary"
                  text-color="white"
                  class="text-subtitle1 text-bold"
                  >{{ formatNumber(item.total) }} so'm
                </q-chip>
              </q-item-section>
            </template>

            <q-card
              class="q-py-none"
              style="background-color: rgba(0, 0, 0, 0.1)"
            >
              <q-card-section>
                <q-list separator>
                  <q-item
                    clickable
                    v-for="(product, idx) in item.products"
                    :key="product._id"
                    dense
                    class="q-py-xs"
                  >
                    <q-item-section class="text-primary">
                      <q-item-label class="text-subtitle1">{{
                        idx + 1 + ")  " + product.title
                      }}</q-item-label>
                      <q-item-label caption class="text-subtitle2">{{
                        formatNumber(product.price) + " so'm"
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section
                      class="text-weight-bold text-subtitle1"
                      side
                    >
                      x{{ formatNumber(product.quantity) }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <q-footer v-if="getMappedOrders.length > 0" class="bg-primary">
        <q-toolbar style="height: 64px">
          <q-toolbar-title
            class="text-subtitle1 text-weight-bold text-white row items-center justify-between"
            ><div>Jami:</div>
            <div>{{ formatNumber(getOrdersTotal) }} so'm</div></q-toolbar-title
          >
        </q-toolbar>
      </q-footer>
      <div
        v-else
        style="height: calc(100vh - 128px)"
        class="column bg-accent flex flex-center text-grey-5 text-h6"
      >
        <div>Buyurtmalar mavjud emas</div>
        <q-icon name="warning" color="grey-5" size="70px" />
      </div>
    </div>
  </q-page>
</template>

<script>
import CToolBar from "components/CToolBar.vue";
import { useOrderStore } from "stores/orders";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { onMounted } from "vue";
import { useUtils } from "src/plugins/utils";
import DateInput from "src/components/DateInput.vue";
import { useUniversalStore } from "src/stores/universal-store";

export default defineComponent({
  name: "IndexPage",
  components: {
    CToolBar,
    DateInput,
  },
  setup() {
    const { getMappedOrders, getOrdersTotal } = storeToRefs(useOrderStore());
    const { parsedDate } = storeToRefs(useUniversalStore());
    const { getOrders } = useOrderStore();
    const $q = useQuasar();
    const { formatNumber } = useUtils();

    onMounted(async () => {
      await getOrders(parsedDate.value);
    });

    const formatDateTime = (isoString) => {
      // Create a new Date object from the ISO string
      const date = new Date(isoString);

      // Format the date part (e.g., 'June 3, 2024')
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC", // Ensure the time is treated as UTC
      };

      // Combine date and time parts
      return date.toLocaleString("en-US", options);
    };
    return {
      getMappedOrders,
      getOrdersTotal,
      formatDateTime,
      formatNumber,
    };
  },
});
</script>
