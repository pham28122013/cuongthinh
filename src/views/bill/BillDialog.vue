<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title>{{ isEdit ? "Chỉnh sửa khách hàng" : "Thêm khách hàng" }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="customerData.name" label="Tên khách hàng"></v-text-field>
        <v-text-field v-model="customerData.phone" label="Số điện thoại"></v-text-field>
        <v-text-field v-model="customerData.address" label="Địa chỉ"></v-text-field>
        <v-text-field v-model="customerData.debt" label="Số tiền nợ" type="number"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gray" @click="closeDialog">Hủy</v-btn>
        <v-btn color="green" @click="saveCustomer">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,  // Đây là dialog (do `v-model` trong component cha)
  customer: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["update:modelValue", "save"]);

const localDialog = ref(props.modelValue); // Biến local để kiểm soát dialog
const customerData = ref({ ...props.customer });

// Đồng bộ trạng thái Dialog
watch(() => props.modelValue, (newValue) => {
  localDialog.value = newValue;
});

watch(() => props.customer, (newCustomer) => {
  customerData.value = { ...newCustomer };
}, { deep: true });

// Đóng dialog
const closeDialog = () => {
  emit("update:modelValue", false);
};

// Lưu khách hàng
const saveCustomer = () => {
  emit("save", customerData.value);
  closeDialog();
};
</script>
