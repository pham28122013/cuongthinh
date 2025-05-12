<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h6">Xác nhận xóa</v-card-title>
      <v-card-text>Bạn có chắc muốn xóa mục này không?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" text @click="dialog = false">Hủy</v-btn>
        <v-btn color="red" text @click="confirmDelete">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const dialog = ref(false)
const currentId = ref(null)

function open(id) {
  currentId.value = id
  dialog.value = true
}

function confirmDelete() {
  dialog.value = false
  emit('confirm', currentId.value) // emit id ra ngoài
}

defineExpose({ open })
const emit = defineEmits(['confirm'])
</script>
