<script setup lang="ts">
import { ref, watch } from 'vue'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'

const props = defineProps<{ modelValue: boolean; boardId: string | null }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const open = ref(props.modelValue)
watch(() => props.modelValue, v => (open.value = v))
watch(open, v => emit('update:modelValue', v))

const title = ref('')
const error = ref('')

const boards = useBoardsStore()

function close() {
  open.value = false
}

function submit() {
  error.value = ''
  const name = title.value.trim()
  if (!name) {
    error.value = 'Column name is required'
    return
  }
  if (!props.boardId) {
    error.value = 'No board selected'
    return
  }
  boards.addColumn(props.boardId, name)
  title.value = ''
  close()
}
</script>

<template>
  <Modal v-model="open" :closeOnBackdrop="true" title="Add New Column">
    <div class="grid gap-2 text-sm">
      <label class="text-xs font-medium text-muted-foreground">Column Name</label>
      <input v-model="title" class="input" type="text" placeholder="e.g. Todo" @keyup.enter="submit" />
      <p v-if="error" class="text-destructive text-xs">{{ error }}</p>
    </div>

    <template #actions>
      <div class="flex justify-end gap-2">
        <button class="btn-outline" @click="close">Cancel</button>
        <button class="btn-primary" @click="submit">Create Column</button>
      </div>
    </template>
  </Modal>
</template>

