<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  titleClass?: string
  closeOnBackdrop?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'close'): void
}>()

const open = ref(props.modelValue)
watch(() => props.modelValue, v => (open.value = v))
watch(open, v => emit('update:modelValue', v))

function close() {
  open.value = false
  emit('close')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <transition name="fade" appear>
      <div v-if="open" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"></div>
    </transition>
    <transition name="pop" appear>
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center p-4" @click.self="closeOnBackdrop !== false ? close() : null">
        <div class="w-full max-w-lg rounded-lg bg-card text-card-foreground shadow-lg border">
          <header
            v-if="title || $slots.header"
            :class="['px-5 py-4 border-b text-base font-semibold', titleClass]">
            <slot name="header">{{ title }}</slot>
          </header>
          <div class="p-5">
            <slot />
          </div>
          <footer class="px-5 pb-5 pt-2">
            <slot name="actions" />
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
  
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .15s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
.pop-enter-active,.pop-leave-active{ transition: transform .15s ease, opacity .15s ease }
.pop-enter-from,.pop-leave-to{ opacity:0; transform: translateY(8px) scale(.98) }
</style>
