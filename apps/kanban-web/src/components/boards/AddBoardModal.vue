<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const open = ref(props.modelValue)
const name = ref('')
const nameError = ref('')
const columns = ref<{ id: string; title: string }[]>([])
const columnsError = ref('')

const boards = useBoardsStore()
const router = useRouter()

function createColumnField(value = '') {
  return { id: Math.random().toString(36).slice(2, 9), title: value }
}

function resetForm() {
  name.value = ''
  nameError.value = ''
  columnsError.value = ''
  columns.value = [createColumnField(''), createColumnField('')]
}

function ensureFormInitialised() {
  if (columns.value.length === 0) {
    columns.value = [createColumnField(''), createColumnField('')]
  }
}

watch(() => props.modelValue, v => {
  open.value = v
  if (v) {
    resetForm()
  }
})

watch(open, v => {
  emit('update:modelValue', v)
  if (!v) {
    // leave form reset for next open
    nameError.value = ''
    columnsError.value = ''
  }
})

function close() {
  open.value = false
}

function addColumnField() {
  columns.value.push(createColumnField(''))
}

function removeColumnField(id: string) {
  if (columns.value.length <= 1) return
  columns.value = columns.value.filter(col => col.id !== id)
  if (columns.value.length === 0) addColumnField()
}

function submit() {
  nameError.value = ''
  columnsError.value = ''
  const boardTitle = name.value.trim()
  const columnTitles = columns.value.map(col => col.title.trim()).filter(Boolean)

  if (!boardTitle) {
    nameError.value = 'Board name is required'
  }
  if (columnTitles.length === 0) {
    columnsError.value = 'Add at least one column'
  }
  if (nameError.value || columnsError.value) {
    ensureFormInitialised()
    return
  }

  const board = boards.addBoard(boardTitle, columnTitles)
  if (!board) {
    nameError.value = 'Could not create board'
    return
  }

  close()
  router.push({ name: 'board', params: { slug: board.slug } })
}
</script>

<template>
  <Modal v-model="open" :closeOnBackdrop="true" title="Add New Board">
    <div class="grid gap-4 text-sm">
      <div class="grid gap-2">
        <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</label>
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="e.g. Marketing Plan"
          @keyup.enter="submit"
        />
        <p v-if="nameError" class="text-xs text-destructive">{{ nameError }}</p>
      </div>
      <div class="grid gap-2">
        <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Columns</label>
        <div class="grid gap-2">
          <div v-for="(column, index) in columns" :key="column.id" class="flex items-center gap-2">
            <input
              v-model="column.title"
              class="input"
              type="text"
              :placeholder="index === 0 ? 'e.g. Todo' : 'e.g. Doing'"
            />
            <button
              class="btn-outline px-3 py-2 text-xs"
              type="button"
              @click="removeColumnField(column.id)"
              :disabled="columns.length <= 1"
            >
              Remove
            </button>
          </div>
        </div>
        <p v-if="columnsError" class="text-xs text-destructive">{{ columnsError }}</p>
        <button class="btn-secondary w-full text-primary" type="button" @click="addColumnField">
          + Add New Column
        </button>
      </div>
    </div>

    <template #actions>
      <button class="btn-primary w-full" type="button" @click="submit">
        Create New Board
      </button>
    </template>
  </Modal>
</template>
