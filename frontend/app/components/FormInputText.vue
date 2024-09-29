<script setup lang="ts">
import { kebabCase } from 'change-case'

type Props = {
  name: string
  label: string
  type?: string
}

const { name, label, type = 'text' } = defineProps<Props>()

const { value, errorMessage, meta, handleBlur } = useField<string>(name)

const kebabName = computed(() => kebabCase(name))
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="kebabName">{{ label }}</label>
    <InputText
      :id="kebabName"
      v-model="value"
      :type="type"
      :invalid="!!errorMessage"
      @blur="handleBlur"
    />
    <small v-if="errorMessage && meta.touched" :id="kebabName + '-help'">
      {{ errorMessage }}
    </small>
  </div>
</template>
