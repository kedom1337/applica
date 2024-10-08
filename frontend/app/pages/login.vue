<script setup lang="ts">
import { z } from 'zod'

const store = useUserStore()

definePageMeta({
  layout: false,
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      userName: z.string(),
      password: z.string(),
    })
  ),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await store.login(values.userName, values.password)
  } catch (err) {
    resetForm()

    throw err
  }

  navigateTo('/')
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
