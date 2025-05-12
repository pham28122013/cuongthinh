<template>
  <v-app>
    <v-navigation-drawer app permanent class="sidebar">
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          exact-active-class="active-menu"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
  
      <!-- Nút Logout nằm dưới cùng -->
      <template v-slot:append>
        <v-btn block color="red" class="logout-btn" @click="logout">
          Đăng xuất
        </v-btn>
      </template>
    </v-navigation-drawer>

    <v-main class="content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const menuItems = [
      { title: "Khách hàng", route: "/dashboard/customer" },
      { title: "Hóa đơn", route: "/dashboard/bill"},
      { title: "Sản phẩm", route: "/dashboard/product"},
      { title: "Thông tin", route: "/dashboard/profile" },
    ];

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };

    return { menuItems, logout };
  },
};
</script>

<style scoped>
/* Sidebar */
.sidebar {
  background-color: #1e1e2d; /* Màu tối */
  color: white;
  position: fixed; /* Giữ sidebar cố định */
  top: 0;
  left: 0; /* Sát lề trái */
  width: 250px; /* Độ rộng sidebar */
  height: 100vh; /* Chiếm toàn bộ chiều cao */
  z-index: 1000; /* Giữ trên các phần khác */
}

/* Nội dung chính */
.v-main {
  margin-left: 250px; /* Đẩy nội dung sang phải */
  padding: 20px;
}

/* Menu item */
.v-list-item {
  color: white !important;
  transition: background 0.3s, color 0.3s;
}

.v-list-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Active menu */
.active-menu {
  background: #6200ea !important; /* Màu tím của Vuetify */
  color: white !important;
  font-weight: bold;
}

/* Logout button */
.logout-btn {
  margin-bottom: 16px;
  background-color: #ff4d4d;
  color: white;
}

.logout-btn:hover {
  background-color: #e63946;
}
</style>
