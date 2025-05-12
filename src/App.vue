<template>
  <v-app>
    <v-main class="app-container">
      <router-view v-if="!isLoginPage" />
      <v-container v-else class="login-container" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const isLoginPage = computed(() => route.path === "/login");

    return { isLoginPage };
  },
};
</script>

<style>
/* ✅ Loại bỏ hoàn toàn thanh cuộn */
html, body, #app, .v-application {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
}

/* ✅ Đảm bảo form login căn giữa màn hình */
.login-container {
  width: 100%;
  height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 !important; /* Xóa padding */
  margin: 0 !important; /* Xóa margin */
  overflow: hidden !important; /* Ngăn chặn tràn */
}

/* ✅ Đảm bảo mọi phần tử con không làm tràn */
.v-container {
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
