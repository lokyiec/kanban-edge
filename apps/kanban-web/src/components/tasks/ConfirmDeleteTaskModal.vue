<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useBoardsStore } from '../../stores/boards'
import Modal from '../ui/Modal.vue'

const props = withDefaults(defineProps<{ modelValue: boolean; cardId?: string | null }>(), {
  cardId: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'deleted'): void
  (e: 'cancel'): void
}>()

const boards = useBoardsStore()
const open = ref(props.modelValue)

const card = computed(() => (props.cardId ? boards.getCardById(props.cardId) : null))

watch(
  () => props.modelValue,
  value => {
    open.value = value
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
  emit('cancel')
}

function confirmDelete() {
  if (!card.value) {
    close()
    return
  }
  boards.deleteCard(card.value.id)
  open.value = false
  emit('deleted')
}
</script>

<template>
  <Modal v-model="open" title="Delete this task?" title-class="text-destructive" :close-on-backdrop="false">
    <div class="space-y-4 text-sm">
      <p class="text-muted-foreground">
        Are you sure you want to delete the '{{ card?.title }}' task? This action will remove subtasks and cannot be
        reversed.
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
