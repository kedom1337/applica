import { defineStore } from 'pinia'
import type { LoginResponse, User } from '~/types/auth'

export const useUserStore = defineStore('user', () => {
  const $user = ref<User | null>(null)
  const $isLoading = ref(false)

  const jwtToken = useCookie('jwtToken', {
    sameSite: 'lax',
  })

  async function login(userName: string, password: string): Promise<void> {
    $isLoading.value = true
    try {
      const response = await useNuxtApp().$api<LoginResponse>('/auth/login', {
        method: 'POST',
        body: { userName, password },
      })

      jwtToken.value = response.token
      $user.value = response.user
    } finally {
      $isLoading.value = false
    }
  }

  function logout(): void {
    jwtToken.value = null
    $user.value = null

    navigateTo('/login')
  }

  return {
    user: $user,
    token: jwtToken,
    login,
    logout,
  }
})
