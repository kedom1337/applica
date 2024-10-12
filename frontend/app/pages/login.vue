<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false,
  middleware: ['not-authorized'],
})

const userStore = useUserStore()

const { handleSubmit, isSubmitting, resetForm, setErrors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      userName: z.string(),
      password: z.string(),
    })
  ),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await userStore.login(values.userName, values.password)
    navigateTo('/')
  } catch {
    resetForm()
    setErrors({
      userName: 'Invalid',
      password: 'Invalid',
    })
  }
})
</script>

<template>
  <div class="flex h-full">
    <Card class="m-a w-full max-w-[25rem]">
      <template #title>Login</template>
      <template #content>
        <form class="flex flex-col gap-4 mt-4" @submit="onSubmit">
          <FormInputText name="userName" label="Username" />
          <FormInputText name="password" label="Password" type="password" />
          <Button
            label="Login"
            class="mt-2"
            type="submit"
            :icon="isSubmitting ? 'pi pi-spin pi-spinner' : ''"
            :disabled="isSubmitting"
          />
        </form>
      </template>
    </Card>
  </div>
</template>
