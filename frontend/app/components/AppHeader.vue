<script setup lang="ts">
const store = useUserStore()

const initials = computed(
  () =>
    store.user?.name
      .split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('') ?? ''
)
</script>
<template>
  <Toolbar>
    <template #start>
      <span>Applica</span>
    </template>
    <template #end>
      <Avatar :label="initials" />
    </template>
  </Toolbar>
</template>
