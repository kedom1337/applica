import { Hono } from 'hono'
import { db } from '../db'

export const app = new Hono().basePath('/fields')

app.get('/', async (c) => {
  try {
    const result = await db.query.fields.findMany()

    return c.json({
      result,
    })
  } catch (err) {
    return c.json({ error: err }, 500)
  }
})
