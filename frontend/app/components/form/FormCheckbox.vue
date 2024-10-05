<script setup lang="ts">
import { kebabCase } from 'change-case'

type Props = {
  name: string
  label: string
}

const { name, label } = defineProps<Props>()
const { value, errors } = useField<boolean>(name)

const kebabName = computed(() => kebabCase(name))
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <Checkbox
        :id="kebabName"
        v-model="value"
        v-bind="$attrs"
        :invalid="errors.length > 0"
      />
      <label :for="kebabName">{{ label }}</label>
    </div>
  </div>
</template>
