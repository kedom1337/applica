import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseURL: 'http://localhost:8080/api',
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-10-12',
  devtools: {
    enabled: true,
  },
  css: ['~/assets/main.css'],
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
  vue: {
    propsDestructure: true,
  },
})

