<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'
import { z } from 'zod'

const props = withDefaults(
  defineProps<{ modelValue: boolean; mode?: 'create' | 'edit'; boardId?: string }>(),
  { mode: 'create', boardId: undefined },
)
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

type ColumnField = { key: string; title: string; existingId?: string }

const open = ref(props.modelValue)
const name = ref('')
const nameError = ref('')
const columns = ref<ColumnField[]>([])
const columnsError = ref('')

const boards = useBoardsStore()
const router = useRouter()
const route = useRoute()

const isEdit = computed(() => props.mode === 'edit')

const formSchema = z.object({
  name: z.string().trim().min(1, 'Board name is required'),
  columns: z
    .array(z.string().trim().min(1, 'Column name is required'))
    .min(1, 'Add at least one column'),
})

function createColumnField(value = '', existingId?: string): ColumnField {
  return { key: Math.random().toString(36).slice(2, 9), title: value, existingId }
}

function resetForm() {
  name.value = ''
  nameError.value = ''
  columnsError.value = ''
  columns.value = [createColumnField(''), createColumnField('')]
}

function hydrateFromBoard() {
  if (!props.boardId) {
    resetForm()
    return
  }
  const board = boards.getById(props.boardId)
  if (!board) {
    resetForm()
    return
  }
  name.value = board.title
  nameError.value = ''
  columnsError.value = ''
  columns.value = board.columns.length
    ? board.columns.map(col => createColumnField(col.title, col.id))
    : [createColumnField('')]
}

function ensureFormInitialised() {
  if (columns.value.length === 0) {
    columns.value = [createColumnField('')]
  }
}

watch(
  () => props.modelValue,
  v => {
    open.value = v
    if (v) {
      if (isEdit.value) hydrateFromBoard()
      else resetForm()
    }
  },
)

watch(
  () => props.boardId,
  () => {
    if (open.value && isEdit.value) hydrateFromBoard()
  },
)

watch(open, v => {
  emit('update:modelValue', v)
  if (!v) {
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

function removeColumnField(key: string) {
  if (columns.value.length <= 1) return
  columns.value = columns.value.filter(col => col.key !== key)
  if (columns.value.length === 0) addColumnField()
}

function submit() {
  nameError.value = ''
  columnsError.value = ''

  const result = formSchema.safeParse({
    name: name.value,
    columns: columns.value.map(col => col.title),
  })

  if (!result.success) {
    const issues = result.error.issues
    for (const issue of issues) {
      const [field] = issue.path
      if (field === 'name' && !nameError.value) nameError.value = issue.message
      if (field === 'columns' && !columnsError.value) columnsError.value = issue.message
    }
    ensureFormInitialised()
    return
  }

  const { name: boardTitle, columns: columnTitles } = result.data

  if (isEdit.value && props.boardId) {
    const preparedColumns = columns.value.map((col, index) => ({
      id: col.existingId,
      title: columnTitles[index],
    }))
    const board = boards.updateBoard(props.boardId, { title: boardTitle, columns: preparedColumns })
    if (!board) {
      nameError.value = 'Could not update board'
      return
    }

    close()
    if (route.name === 'board') {
      router.push({ name: 'board', params: { slug: board.slug } })
    }
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
  <Modal v-model="open" :title="isEdit ? 'Edit Board' : 'Add New Board'">
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
          <div v-for="(column, index) in columns" :key="column.key" class="flex items-center gap-2">
            <input
              v-model="column.title"
              class="input"
              type="text"
              :placeholder="index === 0 ? 'e.g. Todo' : 'e.g. Doing'"
            />
            <button
              class="btn-outline px-3 py-2 text-xs"
              type="button"
              @click="removeColumnField(column.key)"
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
        {{ isEdit ? 'Save Changes' : 'Create New Board' }}
      </button>
    </template>
  </Modal>
</template>
