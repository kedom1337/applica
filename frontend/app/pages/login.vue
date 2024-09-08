<script setup lang="ts">
import { object, string } from 'yup'

definePageMeta({
  layout: false,
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      userName: string().required().label('Username'),
      password: string().required().min(8).label('Password'),
    })
  ),
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
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
