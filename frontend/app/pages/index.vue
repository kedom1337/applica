<script setup lang="ts">
const store = useApplicationsStore()
await useAsyncData('applications', () => store.fetchApplications())
</script>

<template>
  <div>
    <pre>{{ store.applications }}</pre>
  </div>
</template>
