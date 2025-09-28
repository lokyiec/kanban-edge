<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../ui/Modal.vue'
import { useBoardsStore } from '../../stores/boards'
import { useUiStore } from '../../stores/ui'

const props = withDefaults(defineProps<{ modelValue: boolean; boardId?: string }>(), {
  boardId: undefined,
})
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const open = ref(props.modelValue)

const boards = useBoardsStore()
const ui = useUiStore()
const router = useRouter()

watch(
  () => props.modelValue,
  value => {
    open.value = value
  },
)

watch(open, value => {
  emit('update:modelValue', value)
})

const board = computed(() => (props.boardId ? boards.getById(props.boardId) : null))
const boardTitle = computed(() => board.value?.title ?? 'this board')

watch(board, value => {
  if (open.value && !value) {
    close()
  }
})

function close() {
  open.value = false
}

function navigateAfterDelete() {
  if (boards.boards.length > 0) {
    const nextSlug = boards.firstBoardSlug
    if (nextSlug) {
      router.push({ name: 'board', params: { slug: nextSlug } })
      return
    }
  }
  router.push({ name: 'home' })
}

function confirmDelete() {
  const target = board.value
  if (!target) {
    close()
    return
  }

  if (ui.editingBoardId === target.id) {
    ui.closeEditBoardModal()
  }

  const deleted = boards.deleteBoard(target.id)
  close()
  if (!deleted) return

  navigateAfterDelete()
}
</script>

<template>
  <Modal
    v-model="open"
    title="Delete this board?"
    title-class="text-destructive"
    :close-on-backdrop="false"
  >
    <div class="grid gap-4 text-sm">
      <p class="text-muted-foreground">
        Are you sure you want to delete the '{{ boardTitle }}' board? This action will remove all columns and tasks
        and cannot be reversed.
      </p>
    </div>

    <template #actions>
      <div class="grid gap-2 sm:grid-cols-2">
        <button class="btn-destructive" type="button" @click="confirmDelete">Delete</button>
        <button class="btn-secondary text-primary" type="button" @click="close">Cancel</button>
      </div>
    </template>
  </Modal>
</template>
