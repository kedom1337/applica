export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const toast = useToast()
  const store = useUserStore()

  const api = $fetch.create({
    baseURL: config.public.apiBaseURL,
    onRequest({ options }) {
      if (store.user && store.token) {
        options.headers.set('Authorization', `Bearer ${store.token}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
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
