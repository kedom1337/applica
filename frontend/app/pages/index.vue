<script setup lang="ts">
const store = useApplicationsStore()
</script>

<template>
  <div>
    <pre>{{ store.applications }}</pre>
  </div>
</template>
