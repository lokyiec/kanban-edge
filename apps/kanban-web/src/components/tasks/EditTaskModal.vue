<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { z } from 'zod'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'

const props = withDefaults(defineProps<{ modelValue: boolean; cardId?: string | null }>(), {
  cardId: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'cancel'): void
  (e: 'saved'): void
}>()

const open = ref(props.modelValue)
const boards = useBoardsStore()

const details = computed(() => (props.cardId ? boards.getCardDetails(props.cardId) : null))
const card = computed(() => details.value?.card ?? null)
const boardColumns = computed(() => details.value?.board?.columns ?? [])

const title = ref('')
const description = ref('')
const status = ref('')
const subtasks = ref<{ key: string; title: string; id?: string }[]>([])
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

function createSubtaskField(value = '', id?: string) {
  return { key: Math.random().toString(36).slice(2, 9), title: value, id }
}

function resetForm() {
  const value = card.value
  title.value = value?.title ?? ''
  description.value = value?.description ?? ''
  status.value = value?.columnId ?? ''
  if (!status.value && boardColumns.value.length) {
    status.value = boardColumns.value[0].id
  }
  subtasks.value = value?.subtasks.length
    ? value.subtasks.map(subtask => createSubtaskField(subtask.title, subtask.id))
    : [createSubtaskField('')]
  titleError.value = ''
  subtasksError.value = ''
  statusError.value = ''
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
  () => props.cardId,
  () => {
    if (open.value) resetForm()
  },
)

watch(open, value => {
  emit('update:modelValue', value)
})

watch(card, value => {
  if (open.value && !value) open.value = false
})

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

  if (!card.value) return

  boards.updateCard(card.value.id, {
    title: result.data.title,
    description: description.value,
    columnId: status.value || card.value.columnId,
    subtasks: subtasks.value.map(subtask => ({ id: subtask.id, title: subtask.title })),
  })

  emit('saved')
  close()
}
</script>

<template>
  <Modal v-model="open" title="Edit Task" :close-on-backdrop="false">
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
            <input v-model="subtask.title" class="input" type="text" placeholder="Subtask title" />
            <button class="btn-outline px-3 py-2 text-xs" type="button" @click="removeSubtask(subtask.key)">Remove</button>
          </div>
        </div>
        <p v-if="subtasksError" class="text-xs text-destructive">{{ subtasksError }}</p>
        <button class="btn-secondary w-full text-primary" type="button" @click="addSubtask">+ Add New Subtask</button>
      </div>

      <div class="grid gap-2">
        <label class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</label>
        <select v-model="status" class="input">
          <option v-for="column in boardColumns" :key="column.id" :value="column.id">
            {{ column.title }}
          </option>
        </select>
        <p v-if="statusError" class="text-xs text-destructive">{{ statusError }}</p>
      </div>
    </div>

    <template #actions>
      <div class="flex justify-end gap-2">
        <button class="btn-outline" type="button" @click="cancel">Cancel</button>
        <button class="btn-primary" type="button" @click="submit">Save Changes</button>
      </div>
    </template>
  </Modal>
</template>
