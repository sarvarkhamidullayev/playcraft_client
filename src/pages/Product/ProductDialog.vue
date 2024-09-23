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
        <div v-if="dialogType === 'create'" class="text-h6">
          Yangi Mahsulot qo'shish
        </div>
        <div v-else class="text-h6">Mahsulotni tahrirlash</div>
      </q-card-section>
      <q-card-section>
        <q-input autofocus color="primary" v-model="product.title" label="Nomi">
          <template v-slot:append>
            <q-icon name="fastfood" color="primary" />
          </template>
        </q-input>
        <q-select
          hide-dropdown-icon
          color="primary"
          :popup-content-style="{
            backgroundColor: '#fff',
            color: '#7378cc',
          }"
          v-model="product.category"
          :options="['Taomlar', 'Ichimliklar', 'Boshqalar']"
          label="Bo'limi"
        >
          <template v-slot:append>
            <q-icon name="category" color="primary" />
          </template>
        </q-select>
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
<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useProductStore } from "src/stores/product";
import { useUtils } from "src/plugins/utils";

export default defineComponent({
  name: "PSDialog",
  props: {
    title: {
      type: String,
      default: "Yangi Play Station qo'shish",
    },
  },
  setup(props) {
    const { product, dialog, dialogType } = storeToRefs(useProductStore());
    const { createItem, updateItem } = useProductStore();
    const dlgTitle = ref(props.title);
    const { clearObjectFields } = useUtils();
    const $q = useQuasar();
    const handleClose = () => {
      dialogType.value = "create";
      clearObjectFields(product.value);
    };
    const handleOk = () => {
      if (dialogType.value === "create") {
        createItem();
      } else {
        updateItem();
      }
      dialogType.value = "create";
    };

    return {
      dialog,
      dialogType,
      product,
      dlgTitle,
      handleOk,
      handleClose,
    };
  },
});
</script>
