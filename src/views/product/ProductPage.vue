<template>
  <v-container>
    <v-card>
      <v-card-title>
        Danh sách khách hàng
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openDialog(false)">
          <v-icon left>mdi-plus</v-icon> Thêm khách hàng
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="customers" item-value="id" class="elevation-1">
        <!-- Format số tiền nợ -->
        <template v-slot:[`item.debt`]="{ item }">
          {{ formatCurrency(item.debt) }}
        </template>

        <!-- Hành động -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip text="Xem chi tiết">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" @click="viewCustomer(item)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          
          <v-tooltip text="Chỉnh sửa">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" @click="openDialog(true, item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          
          <v-tooltip text="Xóa">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" @click="deleteCustomer(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Component Dialog Thêm/Sửa -->
    <ProductDialog
      v-model="dialog" 
      :customer="selectedCustomer" 
      :isEdit="isEditing"
      @save="handleSave"
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductDialog from "./ProductDialog.vue";

const router = useRouter();

const headers = [
  { title: "ID", key: "id" },
  { title: "Tên khách hàng", key: "name" },
  { title: "Số điện thoại", key: "phone" },
  { title: "Địa chỉ", key: "address" },
  { title: "Số tiền nợ", key: "debt" },
  { title: "Hành động", key: "actions", sortable: false },
];

const customers = ref([
  { id: 1, name: "Nguyễn Văn A", phone: "0901234567", address: "Hà Nội", debt: 5000000 },
  { id: 2, name: "Trần Thị B", phone: "0912345678", address: "Hồ Chí Minh", debt: 2000000 },
  { id: 3, name: "Lê Văn C", phone: "0923456789", address: "Đà Nẵng", debt: 0 },
]);

const dialog = ref(false);
const isEditing = ref(false);
const selectedCustomer = ref({ name: "", phone: "", address: "", debt: 0 });

const openDialog = (editMode, customer = { name: "", phone: "", address: "", debt: 0 }) => {
  isEditing.value = editMode;
  selectedCustomer.value = { ...customer };
  dialog.value = true;
};

const handleSave = (customerData) => {
  if (isEditing.value) {
    const index = customers.value.findIndex(c => c.id === customerData.id);
    if (index !== -1) customers.value[index] = customerData;
  } else {
    customers.value.push({ ...customerData, id: customers.value.length + 1 });
  }
};

const deleteCustomer = (id) => {
  customers.value = customers.value.filter(c => c.id !== id);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const viewCustomer = (customer) => {
  router.push({ name: "ProductDetail", params: { id: customer.id } });
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
