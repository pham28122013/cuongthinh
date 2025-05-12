import { createRouter, createWebHistory } from 'vue-router';
import CustomerPage from '../views/customer/CustomerPage.vue';
import Login from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import CustomerDetail from '../views/customer/CustomerDetail.vue';
import BillPage from '../views/bill/BillPage.vue';
import BillDetail from '../views/bill/BillDetail.vue';
import ProductPage from '../views/product/ProductPage.vue';
import ProductDetail from '../views/product/ProductDetail.vue';

const routes = [
  { path: '/', redirect: '/login' },  // Mặc định chuyển hướng về login
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: CustomerPage,
      },
      {
        path: "customer/:id",
        name: "CustomerDetail",
        component: CustomerDetail,
        props: true, // Truyền `id` vào component dưới dạng prop
      },
      {
        path: 'bill',
        name: 'Bill',
        component: BillPage,
      },
      {
        path: "bill/:id",
        name: "BillDetail",
        component: BillDetail,
        props: true, // Truyền `id` vào component dưới dạng prop
      },
      {
        path: 'product',
        name: 'Product',
        component: ProductPage,
      },
      {
        path: "product/:id",
        name: "ProductDetail",
        component: ProductDetail,
        props: true, // Truyền `id` vào component dưới dạng prop
      },
    ],
    // Guard để kiểm tra quyền truy cập
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem token có trong localStorage không
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/login'); // Chuyển hướng về trang login nếu chưa đăng nhập
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;