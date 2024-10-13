export function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }

  return value
}

export function randomPassword(length = 12): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&*()_+'

  const passwordArray = new Uint32Array(length)
  crypto.getRandomValues(passwordArray)

  return Array.from(passwordArray, (num) => charset[num % charset.length]).join(
    ''
  )
}

export function randomNumber(range = 10): number {
  return Math.floor(Math.random() * range) + 1
}
