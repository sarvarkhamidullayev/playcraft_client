<template>
  <q-dialog persistent v-model="paymentDlg" :position="dialogPosition">
    <q-card
      class="bg-accent"
      :style="{
        width: $q.screen.lt.sm ? '100%' : '450px',
      }"
    >
      <q-card-section class="q-pb-none row items-center justify-between">
        <div class="text-h6 text-primary">To'lov qilish oynasi</div>
      </q-card-section>
      <q-card-section>
        <q-input
          color="primary"
          v-model="order.payment.cash"
          label="Naqd"
          v-money="{ decimal: '.', thousands: ' ', precision: 0 }"
        >
          <template v-slot:append>
            <q-icon name="monetization_on" color="primary" />
          </template>
        </q-input>

        <q-input
          color="primary"
          v-model="order.payment.card"
          label="Karta"
          v-money="{ decimal: '.', thousands: ' ', precision: 0 }"
          @keyup.enter="handleOk()"
        >
          <template v-slot:append>
            <q-icon name="wallet" color="primary" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-space />
        <q-btn
          flat
          label="Bekor qilish"
          color="primary"
          v-close-popup
          @click="handleClose"
        />
        <q-btn flat label="Saqlash" color="primary" @click="handleOk()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoomStore } from "stores/room";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useUtils } from "src/plugins/utils";
const { getNumber } = useUtils();
const { paymentDlg, order } = storeToRefs(useRoomStore());
const { closeRoom } = useRoomStore();
const $q = useQuasar();
const handleClose = () => {
  order.value.payment.cash = 0;
  order.value.payment.card = 0;
  paymentDlg.value = false;
};

const handleOk = () => {
  closeRoom();
};
watch(
  () => order.value.payment.cash,
  (newVal) => {
    const remaining = order.value.total - getNumber(newVal);
    order.value.payment.card = remaining.toFixed(0);
  }
);
watch(
  () => order.value.payment.card,
  (newVal) => {
    const remaining = order.value.total - getNumber(newVal);
    order.value.payment.cash = remaining.toFixed(0);
  }
);
const dialogPosition = computed(() =>
  $q.screen.lt.sm ? "bottom" : "standard"
);
</script>

<style scoped>
/* Add any styles here */
</style>
