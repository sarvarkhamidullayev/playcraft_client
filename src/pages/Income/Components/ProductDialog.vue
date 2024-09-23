<template>
  <q-dialog
    persistent
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
    v-model="dialog"
  >
    <q-card
      :style="{ width: $q.screen.lt.sm ? '100%' : '450px' }"
      class="bg-accent text-primary"
    >
      <q-card-section class="q-pb-none">
        <div class="text-h6">Mahsulotni tahrirlash</div>
      </q-card-section>
      <q-card-section>
        <q-input
          autofocus
          color="primary"
          disabled
          v-model="product.title"
          readonly
          label="Nomi"
        >
          <template v-slot:append>
            <q-icon name="fastfood" color="primary" />
          </template>
        </q-input>

        <q-input
          color="primary"
          v-model="product.incomePrice"
          label="Kirim narxi"
          v-money="{
            decimal: '.',
            thousands: ' ',
            precision: 0,
          }"
        >
          <template v-slot:append>
            <q-icon name="monetization_on" color="primary" />
          </template>
        </q-input>
        <q-input
          color="primary"
          v-model="product.price"
          label="Sotish narxi"
          v-money="{
            decimal: '.',
            thousands: ' ',
            precision: 0,
          }"
          @keyup.enter="handleOk()"
        >
          <template v-slot:append>
            <q-icon name="monetization_on" color="primary" />
          </template>
        </q-input>
        <q-input
          color="primary"
          v-model="product.quantity"
          label="Soni"
          v-money="{
            decimal: '.',
            thousands: ' ',
            precision: 0,
          }"
        >
          <template v-slot:append>
            <q-icon name="fastfood" color="primary" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
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
import { storeToRefs } from "pinia";
import { useUtils } from "src/plugins/utils";
import { useIncomeStore } from "src/stores/income";

const { clearObjectFields } = useUtils();
const { dialog, product, income } = storeToRefs(useIncomeStore());
const handleClose = () => {
  dialog.value = false;
  clearObjectFields(product.value);
};
const handleOk = () => {
  income.value.products.splice(product.value.idx, 1, product.value);
  dialog.value = false;
};
</script>
