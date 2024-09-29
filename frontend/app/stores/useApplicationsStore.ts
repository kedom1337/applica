import type {
  Application,
  ApplicationStatus,
  DeleteApplication,
  UpdateApplicationStatus,
} from '~/types/api'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Application[]>([])
  const isInitialized = ref(false)
  const isLoading = ref(false)

  async function fetchApplications(): Promise<Application[]> {
    if (!isInitialized.value) {
      isLoading.value = true

      try {
        const data = await useNuxtApp().$api<Application[]>('/applications')
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

  async function deleteApplication(application: Application): Promise<void> {
    try {
      const data = await useNuxtApp().$api<DeleteApplication>('/applications', {
        method: 'DELETE',
        body: {
          id: application.id,
        },
      })

      applications.value = applications.value.filter(
        (appl) => appl.id !== data.id
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async function setApplicationStatus(
    application: Application,
    status: ApplicationStatus
  ): Promise<void> {
    try {
      const data = await useNuxtApp().$api<UpdateApplicationStatus>(
        '/applications/status',
        {
          method: 'POST',
          body: {
            id: application.id,
            status,
          },
        }
      )

      const target = applications.value.findIndex((appl) => appl.id === data.id)
      if (target !== -1) {
        applications.value[target]!.status = data.status
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    applications,
    isInitialized,
    isLoading,
    fetchApplications,
    deleteApplication,
    setApplicationStatus,
  }
})
