import type { Application } from '~/types/api'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Application[]>([])
  const isInitialized = ref(false)
  const isLoading = ref(false)

  async function fetchApplications(): Promise<Application[]> {
    if (!isInitialized.value) {
      isLoading.value = true

      try {
        const data = await useNuxtApp().$api<Application[]>('/application')
        applications.value = data
        isInitialized.value = true
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        isLoading.value = false
      }
    }

    return applications.value
  }

  return { applications, isInitialized, isLoading, fetchApplications }
})
