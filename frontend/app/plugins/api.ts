export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const toast = useToast()
  const userStore = useUserStore()
  const route = useRoute()

  const api = $fetch.create({
    baseURL: config.public.apiBaseURL,
    onRequest({ options }) {
      if (userStore.token) {
        options.headers.set('Authorization', `Bearer ${userStore.token}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401 && route.path !== '/login') {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `An error occurred: ${response.statusText || 'Unknown error'}`,
        life: 3000,
      })
    },
  })

  return {
    provide: {
      api,
    },
  }
})
