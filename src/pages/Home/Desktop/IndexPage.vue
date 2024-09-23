<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 96px)"
      :rows="allRoomsToHome"
      :columns="cols"
      title="Xonalar ma'lumotlari"
      row-key="name"
      :pagination="{ rowsPerPage: 12 }"
    >
      <template v-slot:top-right>
        <q-select
          style="height: 60px !important; width: 250px"
          v-model="filter"
          :options="getRoomsGames"
          label="Filter"
          emit-value
          map-options
          class="q-mx-md"
          behavior="menu"
          color="primary"
          clearable
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="filter_alt" v-if="filter === ''" />
          </template>
        </q-select>
      </template>
      <template v-slot:body-cell="props">
        <q-td style="width: 80px" v-if="props.col.name === 'actions'">
          <q-btn
            :disable="props.row.status === 'free'"
            color="primary"
            flat
            round
            dense
            icon="shopping_cart"
            @click="openCart(props.row.idx)"
          />
          <q-btn
            v-if="props.row.status === 'free'"
            color="primary"
            flat
            round
            dense
            icon="play_circle"
            @click="openRoom(props.row.idx)"
          />
          <q-btn
            v-else
            color="red-4"
            flat
            round
            dense
            icon="check_circle"
            @click="handleOpenPayment(props.row)"
          />
        </q-td>
        <q-td
          v-else-if="props.col.name === 'index'"
          class="text-left"
          style="width: 70px"
        >
          {{ props.value }}
        </q-td>
        <q-td
          v-else-if="props.col.name === 'status'"
          class="text-left"
          style="width: 70px"
        >
          <q-chip
            class="text-center"
            style="width: 80px"
            :color="statusColor(props.value).bg"
            :text-color="statusColor(props.value).text"
          >
            <div class="fit">{{ statusColor(props.value).title }}</div>
          </q-chip>
        </q-td>
        <q-td v-else>
          <div class="text-center">{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { tableCols } from "src/composables/tableColumns";
import { useUtils } from "src/plugins/utils";
import { useRoomStore } from "src/stores/room";
import { useRouter } from "vue-router";
const $q = useQuasar();
const router = useRouter();
const { getNumber } = useUtils();
const cols = tableCols().roomsOnHome;

const { filter, time, order, paymentDlg, allRoomsToHome, getRoomsGames } =
  storeToRefs(useRoomStore());
const { openRoom } = useRoomStore();

const handleOpenPayment = (item) => {
  order.value.room = item.title + " - xona";
  order.value.idx = item.idx;
  order.value.game = {
    title: item.game.label,
    price: item.game.price,
    duration: item.duration,
    totalGamePrice: item.totalGameSum,
  };
  order.value.products = item.products;

  order.value.payment = {
    cash: getNumber(item.totalSum).toFixed(0),
    card: 0,
  };
  order.value.total = item.totalSum.toFixed(0);
  paymentDlg.value = true;
};

const statusColor = (status) => {
  if (status === "free") return { bg: "green", text: "white", title: "Bo'sh" };
  if (status === "expired")
    return { bg: "red", text: "white", title: "Tugagan" };
  if (status === "prepaid")
    return { bg: "orange", text: "white", title: "Limit" };
  if (status === "vip") return { bg: "primary", text: "white", title: "Vip" };
};

const openCart = (idx) => {
  router.push(`/room-cart/${idx}`);
};

setInterval(() => {
  time.value += 1;
}, 10000);
</script>
