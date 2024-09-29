import { Hono } from 'hono'

export const app = new Hono().basePath('/auth')

app.post('/login', (c) => {
  return c.json({ message: 'Login' })
})

app.get('/verify', (c) => {
  return c.json({ message: 'Verify' })
})
