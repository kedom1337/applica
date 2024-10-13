import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { applications, fields, courses, auth } from './routes'
import { HTTPException } from 'hono/http-exception'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const app = new Hono().basePath('/api')

app.use(logger(), secureHeaders(), prettyJSON(), cors())

app.route('/', applications.app)
app.route('/', fields.app)
app.route('/', courses.app)
app.route('/', auth.app)

app.notFound((c) => c.json({ message: 'Not Found' }, StatusCodes.NOT_FOUND))

app.onError((err, c) => {
  let res
  if (err instanceof HTTPException) {
    res = c.json({ message: err.message }, err.status)
  } else {
    console.error('Internal server error: ', err)

    res = c.json(
      { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  return res
})

export default {
  port: 8080,
  fetch: app.fetch,
}
