import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// ✅ Import Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify(); // ✅ Tạo instance Vuetify

const app = createApp(App);
app.use(router);
app.use(vuetify); // ✅ Đăng ký Vuetify
app.mount('#app');



