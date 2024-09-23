<template>
  <q-page class="bg-accent">
    <CToolBar title="Xarajatlar">
      <template v-slot:right>
        <q-btn flat dense round icon="add" @click="openDialog()" />
      </template>
    </CToolBar>
    <ExpensesDialog title="Expenses" />
    <DateInput />
    <q-scroll-area
      v-if="getMappedExpenses.length"
      class="bg-accent q-py-sm"
      style="height: calc(100vh - 192px)"
    >
      <q-list separator>
        <q-item clickable v-for="(item, idx) in getMappedExpenses" :key="item">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ idx + 1 }}
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-primary">
            <q-item-label class="text-weight-bold text-subtitle1">
              <div class="row items-center justify-between">
                <div>{{ formatNumber(item.amount) + " so'm" }}</div>
                <div class="text-grey-5">{{ formatDate(item.date) }}</div>
              </div>
            </q-item-label>
            <q-item-label class="text-subtitle2 text-grey-5">
              <div class="row items-center justify-between">
                <div>{{ item.spendedBy.name }}</div>
                <div>{{ item.spendedBy.phone }}</div>
              </div>
            </q-item-label>
            <q-item-label
              caption
              class="text-subtitle2 text-grey-5 ellipsis-2-lines"
              >{{ item.description }}</q-item-label
            >
          </q-item-section>

          <q-item-section side v-if="signedUser.role === 'user'">
            <q-btn
              color="primary"
              flat
              round
              dense
              icon="edit"
              @click="
                openDialog(item),
                  (dialogType = 'edit'),
                  (expense = JSON.parse(JSON.stringify(item)))
              "
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-footer v-if="getMappedExpenses.length > 0" class="bg-primary">
      <q-toolbar style="height: 64px">
        <q-toolbar-title
          class="text-subtitle1 text-weight-bold text-white row items-center justify-between"
          ><div>Jami:</div>
          <div>{{ formatNumber(getExpensesTotal) }} so'm</div></q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
    <div
      v-else
      style="height: calc(100vh - 128px)"
      class="column bg-accent flex flex-center text-grey-5 text-h6"
    >
      <div>Xarajatlar mavjud emas</div>
      <q-icon name="warning" color="grey-5" size="70px" />
    </div>
  </q-page>
</template>

<script setup>
import CToolBar from "components/CToolBar.vue";
import ExpensesDialog from "./ExpensesDialog.vue";
import DateInput from "src/components/DateInput.vue";
import { useExpenseStore } from "stores/expenses";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { onMounted } from "vue";
import { useUtils } from "src/plugins/utils";
import { useUniversalStore } from "src/stores/universal-store";
import { useAuthStore } from "../Auth/auth-store";

const { getMappedExpenses, getExpensesTotal, expense, dialog, dialogType } =
  storeToRefs(useExpenseStore());
const { parsedDate } = storeToRefs(useUniversalStore());
const { getExpenses } = useExpenseStore();
const { formatNumber, formatTime, formatDate } = useUtils();
const { signedUser } = storeToRefs(useAuthStore());
const $q = useQuasar();

onMounted(async () => {
  await getExpenses(parsedDate.value);
});

const openDialog = () => {
  dialog.value = !dialog.value;
};
</script>
