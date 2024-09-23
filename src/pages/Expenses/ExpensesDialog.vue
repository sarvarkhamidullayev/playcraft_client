<template>
  <q-dialog
    persistent
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
    v-model="dialog"
    class="dialog"
  >
    <q-card
      :style="{
        width: $q.screen.lt.sm ? '100%' : '450px',
      }"
      class="bg-white text-white"
    >
      <q-card-section class="q-pb-none text-primary">
        <div v-if="dialogType === 'create'" class="text-h6">
          Yangi xarajat qo'shish
        </div>
        <div v-else class="text-h6">Xarajatni tahrirlash</div>
      </q-card-section>
      <q-card-section>
        <q-input
          color="primary"
          autofocus
          v-model="expense.amount"
          label="Xarajat summasi"
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
          v-model="expense.description"
          label="Xarajat haqida ma'lumot"
          autogrow
          type="textarea"
          @keyup.enter="handleOk()"
        >
          <template v-slot:append>
            <q-icon name="description" color="primary" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-if="dialogType !== 'create'"
          icon="delete"
          flat
          dense
          round
          color="red-5"
          v-close-popup
          @click="onDelete"
        />
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
<script>
import { useExpenseStore } from "stores/expenses";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PSDialog",
  props: {
    title: {
      type: String,
      default: "Yangi xarajat qo'shish",
    },
  },
  setup(props) {
    const { expense, dialog, dialogType } = storeToRefs(useExpenseStore());
    const { createExpense, updateItem, deleteItem } = useExpenseStore();
    const dlgTitle = ref(props.title);
    const $q = useQuasar();
    const handleClose = () => {
      dialogType.value = "create";
      clearObjectFields(expense.value);
    };
    const handleOk = () => {
      if (dialogType.value === "create") {
        createExpense();
      } else {
        updateItem();
      }
      dialogType.value = "create";
    };

    const onDelete = () => {
      $q.dialog({
        title: "O'chirish",
        dark: false,
        message: "Rostdan ham ochirmoqchimisz?",
        cancel: true,
        persistent: true,
        class: "bg-accent text-primary",
      })
        .onOk(() => {
          dialogType.value = "create";
          deleteItem();
        })

        .onCancel(() => {
          dialogType.value = "create";
          clearObjectFields(expense.value);
        });
    };
    return {
      dialog,
      dialogType,
      expense,
      dlgTitle,
      handleOk,
      handleClose,
      onDelete,
    };
  },
});
</script>
<style scoped>
.dialog {
  width: 500px !important;
}
</style>
