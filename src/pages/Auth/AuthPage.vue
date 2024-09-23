<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex bg-accent flex-center">
        <q-card style="width: 340px" class="bg-transparent no-shadow">
          <q-card-section class="q-py-none">
            <div class="logo">
              <img src="~assets/logo.png" />
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-y-xs q-py-none">
            <q-input
              color="primary"
              v-model="user.phone"
              label="Telefon raqam"
              placeholder="+998 (90) 123-45-67"
              mask="+###-(##) ###-##-##"
            >
              <template v-slot:append>
                <q-icon name="phone" color="primary" />
              </template>
            </q-input>
            <q-input
              type="password"
              color="primary"
              v-model="user.password"
              label="Parol"
              @keyup.enter="handleLogin"
            >
              <template v-slot:append>
                <q-icon name="lock" color="primary" />
              </template>
            </q-input>
          </q-card-section>
          <!--
          <q-card-section>
            <q-checkbox v-model="user.remember" label="Parolni eslab qolish" />
          </q-card-section> -->

          <q-card-actions align="center" class="q-pt-lg">
            <q-btn
              class="btn"
              color="primary"
              label="Kirish"
              @click="handleLogin"
            />
          </q-card-actions>
          <q-card-section class="q-py-sm row justify-center">
            <q-btn
              no-caps
              @click="handleRestorePassword"
              flat
              color="primary"
              label="Parolni unutdingizmi?"
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "./auth-store";
import { useQuasar } from "quasar";
const { user } = storeToRefs(useAuthStore());
const { login } = useAuthStore();
const $q = useQuasar();

const handleLogin = async () => {
  await login();
};

const handleRestorePassword = () => {
  $q.dialog({
    title: "Parolni tiklash",
    message: "Parolni tiklash uchun biz bilan bog'laning",
    ok: "Qo'ng'iroq qilish",
    cancel: false,
  }).onOk(() => {
    // check device is mobile or desktop
    if ($q.screen.lt.md) {
      window.location.href = "tel:+998950064666";
    } else {
      $q.notify({
        message: "Telefon raqam: +998 95 006-46-66",
        color: "primary",
        position: "top",
        timeout: 10000,
      });
    }
  });
};
</script>
<style scoped>
.logo {
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
}
.logo img {
  width: 100%;
}
.btn {
  width: 70%;
  height: 50px;
  border-radius: 30px;
}
</style>
