import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { applications, fields, courses, auth } from './routes'
import { HTTPException } from 'hono/http-exception'

const app = new Hono().basePath('/api')

app.use(logger(), secureHeaders(), prettyJSON())

app.route('/', applications.app)
app.route('/', fields.app)
app.route('/', courses.app)
app.route('/', auth.app)

app.notFound((c) => c.json({ message: 'Not Found' }, 404))
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status)
  }

  return c.json({ message: 'Internal server error' }, 500)
})

export default {
  port: 8080,
  fetch: app.fetch,
}
