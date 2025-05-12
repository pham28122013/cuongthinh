<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="login-box pa-6">
      <v-card-title class="text-center text-h5 font-weight-bold">Đăng nhập</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field 
            v-model="username" 
            label="Tên đăng nhập" 
            outlined 
            dense 
            required 
          ></v-text-field>

          <v-text-field 
            v-model="password" 
            label="Mật khẩu" 
            type="password" 
            outlined 
            dense 
            required 
          ></v-text-field>

          <v-btn type="submit" block color="primary" class="mt-4">Đăng nhập</v-btn>

          <p v-if="errorMessage" class="error mt-3 text-red text-center">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { login } from '../api';  // Import dịch vụ API

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.username, this.password);  // Gọi API login
        console.log(response);
        
        localStorage.setItem('token', response.token);  // Lưu token vào localStorage

        // Chuyển hướng hoặc xử lý thành công
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = 'Đăng nhập thất bại, vui lòng thử lại!';  // Hiển thị thông báo lỗi
      }
    },
  },
};
</script>

<style scoped>
/* ✅ Đảm bảo login-box có kích thước hợp lý & căn giữa */
.login-box {
  width: 400px; /* Điều chỉnh theo nhu cầu */
  max-width: 90%;
}
</style>