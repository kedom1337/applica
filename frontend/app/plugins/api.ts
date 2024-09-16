export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: 'localhost:8080/api/v1',
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  }
})
