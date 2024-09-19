import type { Application } from '~/types/api'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Application[] | null>(null)

  async function fetchApplications(): Promise<Application[]> {
    try {
      const data = await useNuxtApp().$api<Application[]>('/application')
      applications.value = data
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return { applications, fetchApplications }
})
