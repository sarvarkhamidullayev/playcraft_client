<template>
  <q-drawer class="bg-primary" dark v-model="leftDrawer" show-if-above>
    <div class="logo">
      <q-img class="image" src="~assets/1080(light).png" />
    </div>
    <q-list class="menu">
      <template v-for="item in drawerItems" :key="item.label">
        <q-item
          class="item"
          v-if="item.role === signedUser.role"
          clickable
          v-ripple
          active-class="active"
          :active="path === item.to"
          @click="changeLocation(item.to)"
        >
          <q-item-section style="width: 15px" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section class="text-bold text-subtitle1">{{
            item.label
          }}</q-item-section>
          <q-item-section side
            ><q-badge
              rounded
              :color="path === item.to ? 'primary' : 'transparent'"
          /></q-item-section>
        </q-item>
      </template>

      <q-item
        class="item text-bold text-subtitle1"
        clickable
        v-ripple
        @click="handleLogout()"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>Chiqish</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
<script setup>
import { ref } from "vue";
import { useUniversalStore } from "stores/universal-store";
import { storeToRefs } from "pinia";
import { getDrawerItems } from "src/composables/drawerItems";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "src/pages/Auth/auth-store";
import { useQuasar } from "quasar";

const router = useRouter();
const route = useRoute();

const { logout } = useAuthStore();
const { leftDrawer } = storeToRefs(useUniversalStore());
const drawerItems = getDrawerItems();
const $q = useQuasar();
const path = ref(route.fullPath);
const { signedUser } = storeToRefs(useAuthStore());

const changeLocation = (uri) => {
  path.value = uri;
  router.replace(uri);
};
const user = JSON.parse(localStorage.getItem("user"));
function handleLogout() {
  $q.dialog({
    title: "Chiqish",
    message: "Rostdan ham chiqmoqchimisz?",
    color: "primary",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      logout();
    })

    .onCancel(() => {
      // console.log('>>>> Cancel')
    });
}
</script>
<style scoped>
.logo {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo .image {
  width: 50%;
}
.menu {
  height: calc(100% - 200px);
}
.item {
  border-radius: 20px;
  margin: 0px auto;
  width: 90%;
  color: white;
}
.active {
  color: #7378cc !important;
  background-color: white !important;
}
</style>
