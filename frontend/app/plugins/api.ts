export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const toast = useToast()

  const api = $fetch.create({
    baseURL: config.public.apiBaseURL,
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `An error occurred: ${response.statusText || 'Unknown error'}`,
          life: 3000,
        })
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
