<script setup lang="ts">
const store = useApplicationsStore()
await useAsyncData('applications', () => store.fetchApplications())

const formattedApplications = computed(() =>
  store.applications.map((appl) => ({
    ...appl,
    created: new Date(appl.created).toLocaleDateString(),
  }))
)
</script>

<template>
  <div>
    <Card class="m4">
      <template #title>Applications</template>
      <template #content>
        <DataTable :value="formattedApplications">
          <Column field="status" header="Status" sortable />
          <Column field="firstName" header="First name" sortable />
          <Column field="lastName" header="Last name" sortable />
          <Column field="courseId" header="Course" sortable />
          <Column field="semester" header="Semester" sortable />
          <Column field="degree" header="Degree" sortable />
          <Column field="field" header="Field" sortable />
          <Column field="created" header="Created" sortable />
        </DataTable>
      </template>
    </Card>
  </div>
</template>
