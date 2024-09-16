import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,
  },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@unocss/nuxt',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  unocss: {
    nuxtLayers: true,
  },
})

