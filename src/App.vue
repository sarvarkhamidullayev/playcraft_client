<template>
  <router-view />
</template>

<script setup>
import { watch, onMounted, onUnmounted, inject } from "vue";
import { storeToRefs } from "pinia";
import { useUniversalStore } from "./stores/universal-store";
import { useExpenseStore } from "./stores/expenses";
import { useRoute } from "vue-router";
import { useOrderStore } from "./stores/orders";
import { useStatisticStore } from "./stores/statistic";
import { useReportsStore } from "./stores/reports";
import { useRoomStore } from "./stores/room";
import { useUtils } from "./plugins/utils";
import moment from "moment";
import { useGameStore } from "./stores/game";
import { api } from "./boot/axios";
import { useAuthStore } from "./pages/Auth/auth-store";
import { useProductStore } from "./stores/product";
import { useIncomeStore } from "./stores/income";

const route = useRoute();
const { getExpenses } = useExpenseStore();
const { getOrders } = useOrderStore();
const { getStatistics } = useStatisticStore();
const { getReports } = useReportsStore();
const { getIncomes } = useIncomeStore();
const { parsedDate } = storeToRefs(useUniversalStore());
const { notifyTimeIsUp, getMinutesDifference } = useUtils();
const { signedUser } = storeToRefs(useAuthStore());
const { token, club } = signedUser.value;
const { intervalId, rooms } = storeToRefs(useRoomStore());
const { games } = storeToRefs(useGameStore());
const { products } = storeToRefs(useProductStore());

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    Club: club._id,
  },
};

const socket = inject("socket");
const fetchWithData = {
  "/expenses": getExpenses,
  "/orders": getOrders,
  "/statistic": getStatistics,
  "/reports": getReports,
  "/income": getIncomes,
};
const dataWorker = new Worker(
  new URL("src/workers/web-worker.js", import.meta.url)
);
watch(parsedDate, (val) => {
  if (route.fullPath in fetchWithData) {
    fetchWithData[route.fullPath](val);
  }
});

onMounted(async () => {
  const { isOnline } = storeToRefs(useUniversalStore());
  if (isOnline.value) {
    dataWorker.postMessage({
      url: api.defaults.baseURL,
      options,
    });
    dataWorker.onmessage = async (e) => {
      const { allgames, allrooms, allproducts } = e.data;
      games.value = allgames.data;
      rooms.value = allrooms.data;
      products.value = allproducts.data;
      // console.log(games.value);
    };
  }
  setInterval(() => {
    rooms.value.forEach((room, index) => {
      if (room.status === "prepaid") {
        const diff = getMinutesDifference(
          room.startTime,
          moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        );
        if (diff >= room.duration && room.status === "prepaid") {
          socket.emit("timeIsUp", room._id);
          room.status = "expired";
          if (Android) Android.playNotification();
          // notifyTimeIsUp();
        }
      }
    });
  }, 1000 * 10);
});
onUnmounted(() => {
  clearInterval(intervalId);
});

console.log("Project was changed");
</script>
