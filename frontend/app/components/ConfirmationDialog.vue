<script setup lang="ts">
const visible = defineModel<boolean>('visible')

type Emits = {
  (e: 'confirm'): void
}

const emit = defineEmits<Emits>()
</script>
<template>
  <div>
    <Dialog v-model:visible="visible" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <slot />
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="visible = false" />
        <Button label="Yes" icon="pi pi-check" @click="emit('confirm')" />
      </template>
    </Dialog>
  </div>
</template>
