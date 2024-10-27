export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    try {
      await userStore.verify()
    } catch {
      userStore.logout()
    }
  }
})
