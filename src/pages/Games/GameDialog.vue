<template>
  <q-dialog
    persistent
    v-model="dialog"
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
  >
    <q-card :style="{ width: $q.screen.lt.sm ? '100%' : '450px' }">
      <q-card-section class="q-pb-none text-primary">
        <div v-if="dialogType === 'create'" class="text-h6">
          Yangi o'yin qo'shish
        </div>
        <div v-else class="text-h6">O'yinni tahrirlash</div>
      </q-card-section>
      <q-card-section>
        <q-input autofocus color="primary" v-model="game.title" label="Nomi">
          <template v-slot:append>
            <q-icon name="sports_esports" color="primary" />
          </template>
        </q-input>
        <q-input
          color="primary"
          v-model="game.price"
          label="Narxi"
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
import { useQuasar } from "quasar";
import { useUtils } from "src/plugins/utils";
import { useGameStore } from "src/stores/game";

const { game, dialog, dialogType } = storeToRefs(useGameStore());
const { createItem, updateItem } = useGameStore();
const $q = useQuasar();
const { checkObjFieldsForEmptyString, clearObjectFields } = useUtils();

const handleClose = () => {
  dialogType.value = "create";
  clearObjectFields(game.value);
};
const handleOk = () => {
  if (checkObjFieldsForEmptyString(game.value)) {
    $q.notify({
      color: "negative",
      message: "Barcha maydonlarni toliq to'ldiring!",
      icon: "warning",
    });
    return;
  }
  if (dialogType.value === "create") {
    createItem();
  } else {
    updateItem();
  }
  dialogType.value = "create";
};
</script>
