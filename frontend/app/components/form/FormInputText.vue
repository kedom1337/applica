<script setup lang="ts">
import { kebabCase } from 'change-case'

type Props = {
  name: string
  label: string
  type?: string
}

const { name, label, type = 'text' } = defineProps<Props>()
const { value, errorMessage, meta } = useField<string>(name)

const kebabName = computed(() => kebabCase(name))
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="kebabName">{{ label }}</label>
    <Textarea
      v-if="type === 'area'"
      :id="kebabName"
      v-model="value"
      v-bind="$attrs"
      :invalid="!!errorMessage"
    />
    <InputText
      v-else
      :id="kebabName"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :invalid="!!errorMessage"
    />
    <small v-if="errorMessage && meta.touched" :id="kebabName + '-help'">
      {{ errorMessage }}
    </small>
  </div>
</template>
