<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'

const props = withDefaults(defineProps<{ modelValue: boolean; cardId?: string | null }>(), {
  cardId: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const open = ref(props.modelValue)
const boards = useBoardsStore()
const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const details = computed(() => (props.cardId ? boards.getCardDetails(props.cardId) : null))
const card = computed(() => details.value?.card ?? null)
const boardColumns = computed(() => details.value?.board?.columns ?? [])

const subtasksCompleted = computed(() => card.value?.subtasks.filter(subtask => subtask.done).length ?? 0)
const subtasksTotal = computed(() => card.value?.subtasks.length ?? 0)
const descriptionText = computed(() => {
  const text = card.value?.description?.trim()
  return text?.length ? text : 'No description'
})

watch(
  () => props.modelValue,
  value => {
    open.value = value
    if (value) menuOpen.value = false
  },
)

watch(open, value => {
  emit('update:modelValue', value)
  if (!value) {
    menuOpen.value = false
    emit('close')
  }
})

watch(card, value => {
  if (open.value && !value) {
    open.value = false
  }
})

function close() {
  open.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleEdit() {
  closeMenu()
  emit('edit')
}

function handleDelete() {
  closeMenu()
  emit('delete')
}

function toggleSubtask(subtaskId: string) {
  if (!card.value) return
  boards.toggleSubtask(card.value.id, subtaskId)
}

function updateStatus(columnId: string) {
  if (!card.value) return
  boards.moveCard(card.value.id, columnId)
}

function handleClickOutside(event: MouseEvent) {
  if (!menuRef.value) return
  if (menuRef.value.contains(event.target as Node)) return
  menuOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <Modal v-model="open" :close-on-backdrop="true">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold">{{ card?.title || 'Task' }}</h2>
        </div>
        <div class="relative" ref="menuRef">
          <button class="btn-outline h-9 w-9 p-0" type="button" @click.stop="toggleMenu">⋯</button>
          <div
            v-if="menuOpen"
            class="absolute right-0 z-20 mt-2 w-40 rounded-md border bg-card py-2 text-sm shadow-lg"
          >
            <button class="block w-full px-4 py-2 text-left hover:bg-muted disabled:opacity-50" type="button" :disabled="!card" @click="handleEdit">Edit task</button>
            <button class="block w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10 disabled:opacity-50" type="button" :disabled="!card" @click="handleDelete">
              Delete task
            </button>
          </div>
        </div>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-sm text-muted-foreground whitespace-pre-line">{{ descriptionText }}</p>

      <section v-if="subtasksTotal" class="space-y-2">
        <h3 class="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
          Subtasks ({{ subtasksCompleted }} of {{ subtasksTotal }})
        </h3>
        <div class="space-y-2">
          <label
            v-for="subtask in card?.subtasks"
            :key="subtask.id"
            class="flex items-center gap-3 rounded-md bg-muted/40 px-3 py-2 text-sm"
          >
            <input type="checkbox" class="h-4 w-4 rounded border" :checked="subtask.done" @change="toggleSubtask(subtask.id)" />
            <span :class="subtask.done ? 'line-through text-muted-foreground' : ''">{{ subtask.title }}</span>
          </label>
        </div>
      </section>

      <section class="space-y-2">
        <h3 class="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Current Status</h3>
        <select
          class="input"
          :value="card?.columnId"
          @change="updateStatus(($event.target as HTMLSelectElement).value)"
          :disabled="!card"
        >
          <option v-for="column in boardColumns" :key="column.id" :value="column.id">
            {{ column.title }}
          </option>
        </select>
      </section>
    </div>
  </Modal>
</template>
