<script setup lang="ts">
const userStore = useUserStore()
const menu = useTemplateRef('menu')

const initials = computed(
  () =>
    userStore.user?.name
      .split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('') ?? ''
)

const menuItems = ref([
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: (): void => {
      userStore.logout()
      navigateTo('/login')
    },
  },
])

function onMenuClick(event: Event): void {
  menu.value?.toggle(event)
}
</script>
<template>
  <Toolbar>
    <template #start>
      <span>Applica</span>
    </template>
    <template #end>
      <Avatar
        class="cursor-pointer"
        type="button"
        :label="initials"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="onMenuClick"
      />
      <Menu ref="menu" :model="menuItems" popup />
    </template>
  </Toolbar>
</template>
