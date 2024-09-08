// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().prepend({
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})
