<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { z } from 'zod'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'

const props = withDefaults(defineProps<{ modelValue: boolean; boardId?: string | null }>(), {
  boardId: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'created', cardId: string): void
  (e: 'cancel'): void
}>()

const open = ref(props.modelValue)
const boards = useBoardsStore()

const statusOptions = computed(() => boards.getStatusOptions(props.boardId))
const canSubmit = computed(() => Boolean(props.boardId && statusOptions.value.length))

const title = ref('')
const description = ref('')
const status = ref('')
const subtasks = ref<{ key: string; title: string }[]>([])
const titleError = ref('')
const subtasksError = ref('')
const statusError = ref('')

const formSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required'),
  status: z.string().trim().min(1, 'Status is required'),
  subtasks: z
    .array(z.object({ title: z.string().trim().min(1, 'Subtask title is required') }))
    .min(1, 'Add at least one subtask'),
})

function createSubtaskField(value = '') {
  return { key: Math.random().toString(36).slice(2, 9), title: value }
}

function resetForm() {
  title.value = ''
  description.value = ''
  status.value = statusOptions.value[0]?.id ?? ''
  subtasks.value = [createSubtaskField('')]
  titleError.value = ''
  subtasksError.value = ''
  statusError.value = ''
}

watch(
  () => props.modelValue,
  value => {
    open.value = value
    if (value) resetForm()
  },
)

watch(
  () => props.boardId,
  () => {
    if (open.value) resetForm()
  },
)

watch(open, value => {
  emit('update:modelValue', value)
})

watch(statusOptions, options => {
  if (!options.length) {
    status.value = ''
    return
  }
  if (!options.some(option => option.id === status.value)) {
    status.value = options[0].id
  }
}, { immediate: true })

function close() {
  open.value = false
}

function cancel() {
  close()
  emit('cancel')
}

function addSubtask() {
  subtasks.value.push(createSubtaskField(''))
}

function removeSubtask(key: string) {
  if (subtasks.value.length <= 1) return
  subtasks.value = subtasks.value.filter(subtask => subtask.key !== key)
}

function submit() {
  titleError.value = ''
  subtasksError.value = ''
  statusError.value = ''

  const result = formSchema.safeParse({
    title: title.value,
    status: status.value,
    subtasks: subtasks.value.map(subtask => ({ title: subtask.title })),
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      if (issue.path[0] === 'title') titleError.value = issue.message
      if (issue.path[0] === 'subtasks') subtasksError.value = issue.message
      if (issue.path[0] === 'status') statusError.value = issue.message
    }
    if (!subtasks.value.length) addSubtask()
    return
  }

  if (!props.boardId) {
    statusError.value = 'Select a board to continue'
    return
  }

  if (!canSubmit.value) {
    statusError.value = 'Add a column to this board to set a status'
    return
  }

  const card = boards.addCard(props.boardId, {
    title: result.data.title,
    description: description.value,
    columnId: status.value,
    subtasks: subtasks.value.map(subtask => ({ title: subtask.title })),
  })

  if (!card) {
    statusError.value = 'Could not create task'
    return
  }

  emit('created', card.id)
  close()
}
</script>

<template>
  <Modal v-model="open" title="Add New Task" :close-on-backdrop="false">
    <div class="space-y-4 text-sm">
      <div class="grid gap-2">
        <label class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</label>
        <input v-model="title" class="input" type="text" placeholder="e.g. Take coffee break" />
        <p v-if="titleError" class="text-xs text-destructive">{{ titleError }}</p>
      </div>

      <div class="grid gap-2">
        <label class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</label>
        <textarea v-model="description" class="input min-h-[120px]" placeholder="Description" />
      </div>

      <div class="grid gap-2">
        <label class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subtasks</label>
        <div class="grid gap-2">
          <div v-for="subtask in subtasks" :key="subtask.key" class="flex items-center gap-2">
            <input v-model="subtask.title" class="input" type="text" placeholder="e.g. Make coffee" />
            <button class="btn-outline px-3 py-2 text-xs" type="button" @click="removeSubtask(subtask.key)">Remove</button>
          </div>
        </div>
        <p v-if="subtasksError" class="text-xs text-destructive">{{ subtasksError }}</p>
        <button class="btn-secondary w-full text-primary" type="button" @click="addSubtask">+ Add New Subtask</button>
      </div>

      <div class="grid gap-2">
        <label class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</label>
        <select v-model="status" class="input" :disabled="!statusOptions.length">
          <option v-for="option in statusOptions" :key="option.id" :value="option.id">
            {{ option.title }}
          </option>
        </select>
        <p v-if="statusError" class="text-xs text-destructive">{{ statusError }}</p>
        <p v-else-if="!statusOptions.length" class="text-xs text-muted-foreground">Add a column to this board to set statuses.</p>
      </div>
    </div>

    <template #actions>
      <div class="flex justify-end gap-2">
        <button class="btn-outline" type="button" @click="cancel">Cancel</button>
        <button class="btn-primary" type="button" :disabled="!canSubmit" @click="submit">Create Task</button>
      </div>
    </template>
  </Modal>
</template>
