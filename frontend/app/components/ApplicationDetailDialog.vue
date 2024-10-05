<script setup lang="ts">
import { AddApplication } from '~/types/api.schema'

const visible = defineModel<boolean>('visible')

const store = useApplicationsStore()
await useAsyncData('applications', () =>
  store.fetchFieldsAndCourses().then(() => true)
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(AddApplication),
})

const toast = useToast()

const onSubmit = handleSubmit(async (values) => {
  await store.addApplication(values)
  toast.add({
    severity: 'success',
    summary: 'Added',
    detail: `
      You have added an application for ${values.firstName} ${values.lastName}`,
    life: 3000,
  })
  visible.value = false
})
</script>
<template>
  <div>
    <Dialog
      v-model:visible="visible"
      class="w-full max-w-[50rem] m-4"
      header="Application Details"
      modal
    >
      <form
        ref="form"
        class="grid gap-4 grid-cols-1 sm:grid-cols-2"
        @submit="onSubmit"
      >
        <FormInputText name="firstName" label="First name" />
        <FormInputText name="lastName" label="Last name" />

        <FormInputText name="email" label="Email" class="sm:col-span-2" />
        <FormInputText name="phone" label="Phone" class="sm:col-span-2" />

        <FormInputText name="degree" label="Degree" />
        <FormInputNumber
          name="semester"
          label="Semester"
          :use-grouping="false"
          :min="0"
          show-buttons
        />

        <FormSelect
          name="courseId"
          label="Course"
          :options="store.courses"
          option-label="name"
          option-value="id"
        />
        <FormSelect
          name="fields"
          label="Fields"
          :options="store.fields"
          option-label="name"
          option-value="id"
          multi
        />

        <FormInputText
          name="experience"
          label="Experience"
          type="area"
          auto-resize
          rows="4"
          class="sm:col-span-2"
        />

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:col-span-2">
          <FormCheckbox name="messaged" label="Messaged" binary />
          <FormCheckbox name="talked" label="Talked to" binary />
          <FormCheckbox name="clubBriefed" label="Briefed about club" binary />
          <FormCheckbox
            name="securityBriefed"
            label="Briefed about security"
            binary
          />
        </div>

        <FormInputText
          name="information"
          label="Information"
          type="area"
          auto-resize
          rows="4"
          class="sm:col-span-2"
        />
      </form>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          outlined
          @click="visible = false"
        />
        <Button
          label="Save"
          :icon="isSubmitting ? 'pi pi-spin pi-spinner' : ''"
          :disabled="isSubmitting"
          @click="onSubmit"
        />
      </template>
    </Dialog>
  </div>
</template>
