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
              <v-btn icon v-bind="props" @click="openDeleteDialog(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Component Dialog Thêm/Sửa -->
    <CustomerDialog 
      v-model="dialog" 
      :customer="selectedCustomer" 
      :isEdit="isEditing"
      @save="handleSave"
    />
    <DeleteDialog
      ref="deleteDialog"
      @confirm="handleDelete"
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CustomerDialog from "./CustomerDialog.vue";
import DeleteDialog from "../DialogDelete.vue"

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
  try {
    const response = customerCreate(customerData.name, customerData.phone, customerData.address, customerData.debt);  // Gọi API login
    console.log(response);
    
  } catch (error) {
    this.errorMessage = 'Đăng nhập thất bại, vui lòng thử lại!';  // Hiển thị thông báo lỗi
  }
};
const deleteDialog = ref();

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const viewCustomer = (customer) => {
  router.push({ name: "CustomerDetail", params: { id: customer.id } });
};

function openDeleteDialog(id) {
  deleteDialog.value.open(id);
}

function handleDelete(id) {
  console.log(id);
  
  // Gọi API xóa hoặc thực hiện hành động xóa ở đây
  console.log('Đã xác nhận xóa');
}
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
