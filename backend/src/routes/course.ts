import { Hono } from 'hono'
import { db } from '../db'

export const app = new Hono().basePath('/courses')

app.get('/', async (c) => {
  const dbResult = await db.query.courses.findMany()

  return c.json(dbResult)
})
