<template>
  <v-container>
    <v-card v-if="customer">
      <v-card-title>Thông tin hóa đơn</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p><strong>ID:</strong> {{ customer.id }}</p>
        <p><strong>Tên khách hàng:</strong> {{ customer.name }}</p>
        <p><strong>Ngày mua hàng:</strong> {{ customer.address }}</p>
        <p><strong>Số tiền nợ:</strong> {{ formatCurrency(customer.debt) }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="goBack">Quay lại</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
      customersData: [
        { id: 1, name: "Nguyễn Văn A", phone: "0901234567", address: "Hà Nội", debt: 5000000 },
        { id: 2, name: "Trần Thị B", phone: "0912345678", address: "Hồ Chí Minh", debt: 2000000 },
        { id: 3, name: "Lê Văn C", phone: "0923456789", address: "Đà Nẵng", debt: 0 },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/dashboard/bill");
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
  created() {
    const customerId = parseInt(this.$route.params.id);
    this.customer = this.customersData.find((c) => c.id === customerId) || null;
  },
};
</script>
