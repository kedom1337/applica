import type { UseFetchOptions } from '#app'

export function useApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
): ReturnType<typeof useFetch> {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  })
}
