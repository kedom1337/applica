<script setup lang="ts">
import { kebabCase } from 'change-case'

type Props = {
  name: string
  label: string
  multi?: boolean
}

const { name, label, multi = false } = defineProps<Props>()
const { value, errorMessage, meta } = useField(name)

const kebabName = computed(() => kebabCase(name))
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="kebabName">{{ label }}</label>
    <MultiSelect
      v-if="multi"
      v-model="value"
      v-bind="$attrs"
      :invalid="!!errorMessage"
    />
    <Select v-else v-model="value" v-bind="$attrs" :invalid="!!errorMessage" />
    <small v-if="errorMessage && meta.touched" :id="kebabName + '-help'">
      {{ errorMessage }}
    </small>
  </div>
</template>
