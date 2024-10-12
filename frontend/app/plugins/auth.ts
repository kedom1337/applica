export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    await userStore.verify()
  }
})
