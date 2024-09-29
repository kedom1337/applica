import { Hono } from 'hono'
import { db } from '../db'

export const app = new Hono().basePath('/courses')

app.get('/', async (c) => {
  try {
    const result = await db.query.courses.findMany()

    return c.json({
      result,
    })
  } catch (err) {
    return c.json({ error: err }, 500)
  }
})
