import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { applications, fields, courses, auth } from './routes'

const app = new Hono().basePath('/api')

app.use(
  logger((message, ...rest) =>
    console.log(`[${new Date().toISOString()}]`, message, ...rest)
  ),
  secureHeaders(),
  prettyJSON()
)

app.route('/', applications.app)
app.route('/', fields.app)
app.route('/', courses.app)
app.route('/', auth.app)
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

export default {
  port: 8080,
  fetch: app.fetch,
}
