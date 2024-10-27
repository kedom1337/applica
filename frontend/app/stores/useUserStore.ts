import { defineStore } from 'pinia'
import type { LoginResponse, User, VerifyResponse } from '~/types/auth'

export const useUserStore = defineStore('user', () => {
  const $user = ref<User | null>(null)
  const $isLoggedIn = computed(() => !!$user.value)

  const jwtToken = useCookie<string | null>('jwtToken', {
    sameSite: 'lax',
    default: () => null,
  })

  async function login(userName: string, password: string): Promise<void> {
    const response = await useNuxtApp().$api<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { userName, password },
    })

    jwtToken.value = response.token
    $user.value = response.user
  }

  async function verify(): Promise<void> {
    if (jwtToken.value) {
      const response = await useNuxtApp().$api<VerifyResponse>('/auth/verify')

      $user.value = response.user
    }
  }

  function logout(): void {
    jwtToken.value = null
    $user.value = null
  }

  return {
    user: $user,
    token: jwtToken,
    isLoggedIn: $isLoggedIn,
    login,
    logout,
    verify,
  }
})
