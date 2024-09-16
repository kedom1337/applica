import type { Application } from '~/types/api'

export const useApplicationsStore = defineStore('applications', async () => {
  const applications = ref<Application[] | null>(null)

  return { applications }
})
