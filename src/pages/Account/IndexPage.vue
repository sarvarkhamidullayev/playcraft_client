<template>
  <q-page>
    <CToolBar title="Account"> </CToolBar>
    <q-scroll-area class="bg-accent q-pa-md" style="height: calc(100vh - 64px)">
      <div class="text-h6 text-primary">Klub ma'lumotlari</div>
      <q-input
        color="primary"
        v-model="userInfo.club.title"
        label="Klub nomi"
        disabled
        readonly
      >
        <template v-slot:append>
          <q-icon name="domain" />
        </template>
      </q-input>

      <q-input
        color="primary"
        v-model="userInfo.club.status"
        label="Klub holati"
        disabled
        readonly
      >
        <template v-slot:append>
          <q-icon name="local_activity" />
        </template>
      </q-input>

      <div class="text-h6 text-primary q-pt-md">Foydalanuvchi ma'lumotlari</div>
      <q-input
        color="primary"
        v-model="userInfo.name"
        label="Foydalanuvchi ismi"
        disabled
        readonly
      >
        <template v-slot:append>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        color="primary"
        v-model="userInfo.phone"
        label="Foydalanuvchi raqami"
        disabled
        readonly
      >
        <template v-slot:append>
          <q-icon name="phone_in_talk" />
        </template>
      </q-input>
      <q-input
        color="primary"
        v-model="userInfo.role"
        label="Foydalanuvchi roli"
        disabled
        readonly
      >
        <template v-slot:append>
          <q-icon name="supervisor_account" />
        </template>
      </q-input>
    </q-scroll-area>
  </q-page>
</template>

<script>
import CToolBar from "components/CToolBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CToolBar,
  },
  setup() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    return { userInfo };
  },
});
</script>
