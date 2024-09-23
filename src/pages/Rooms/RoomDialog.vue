<template>
  <q-dialog
    persistent
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
    v-model="dialog"
  >
    <q-card
      class="bg-accent"
      :style="{ width: $q.screen.lt.sm ? '100%' : '450px' }"
    >
      <q-card-section class="q-pb-none text-primary">
        <div v-if="dialogType === 'create'" class="text-h6">
          Yangi Xona qo'shish
        </div>
        <div v-else class="text-h6">Xonani tahrirlash</div>
      </q-card-section>
      <q-card-section>
        <q-input
          autofocus
          color="primary"
          type="number"
          v-model="room.title"
          label="Xona raqami"
        />
        <q-select
          color="primary"
          :popup-content-style="{
            backgroundColor: '#fff',
            color: '#7378cc',
          }"
          v-model="room.game"
          :options="mappedForSelect"
          label="O'yin"
          behavior="menu"
        />
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
import { useRoomStore } from "stores/room";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useGameStore } from "src/stores/game";
import { useUtils } from "src/plugins/utils";

export default defineComponent({
  name: "PSDialog",
  props: {
    title: {
      type: String,
      default: "Yangi o'yin qo'shish",
    },
  },
  setup(props) {
    const { room, dialog, dialogType } = storeToRefs(useRoomStore());
    const { mappedForSelect } = storeToRefs(useGameStore());
    const { createItem, updateItem, deleteItem } = useRoomStore();
    const dlgTitle = ref(props.title);
    const $q = useQuasar();
    const { clearObjectFields } = useUtils();

    const handleClose = () => {
      dialogType.value = "create";
      clearObjectFields(room.value);
    };
    const handleOk = () => {
      if (dialogType.value === "create") {
        createItem();
      } else {
        updateItem();
      }
      dialogType.value = "create";
    };

    const confirm = () => {
      $q.dialog({
        title: "Chiqish",
        dark: false,
        message: "Rostdan ham chiqmoqchimisz?",
        cancel: true,
        persistent: true,
        color: "primary",
        class: "bg-accent",
      })
        .onOk(() => {
          dialogType.value = "create";
          deleteItem();
        })

        .onCancel(() => {
          dialogType.value = "create";
          clearObjectFields(room.value);
        });
    };

    return {
      dialog,
      dialogType,
      room,
      dlgTitle,
      handleOk,
      handleClose,
      confirm,
      mappedForSelect,
    };
  },
});
</script>
