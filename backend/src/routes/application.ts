import { Hono } from 'hono'
import { applications, applicationsFields, db } from '../db'
import { zValidator } from '@hono/zod-validator'
import {
  DeleteApplication,
  InsertApplication,
  UpdateApplicationStatus,
  UpdateApplication,
} from '../models/application'
import { eq } from 'drizzle-orm'

export const app = new Hono().basePath('/applications')

app.get('/', async (c) => {
  try {
    const result = await db.query.applications.findMany({
      with: {
        course: true,
        fields: {
          columns: {},
          with: {
            field: true,
          },
        },
      },
    })

    const flattenedResult = result.map((application) => ({
      ...application,
      fields: application.fields.map((field) => field.field),
    }))

    return c.json({
      flattenedResult,
    })
  } catch (err) {
    return c.json({ error: err }, 500)
  }
})

app.post('/', zValidator('json', InsertApplication), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db.transaction(async (tx) => {
    const [newApplication] = await tx
      .insert(applications)
      .values(req)
      .returning({ id: applications.id })

    await tx.insert(applicationsFields).values(
      req.fields.map((fieldId) => ({
        applicationId: newApplication.id,
        fieldId,
      }))
    )

    return newApplication
  })

  return c.json({
    application: dbResult,
  })
})

app.put('/', zValidator('json', UpdateApplication), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db.transaction(async (tx) => {
    const updatedApplication = await tx
      .update(applications)
      .set(req)
      .where(eq(applications.id, req.id))
      .returning()

    if (updatedApplication.length > 0) {
      await tx
        .delete(applicationsFields)
        .where(eq(applicationsFields.applicationId, req.id))

      if (req.fields && req.fields.length > 0) {
        await tx.insert(applicationsFields).values(
          req.fields.map((fieldId) => ({
            applicationId: req.id,
            fieldId,
          }))
        )
      }
    }

    return updatedApplication
  })

  return c.json({
    application: dbResult,
  })
})

app.delete('/', zValidator('json', DeleteApplication), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db
    .delete(applications)
    .where(eq(applications.id, req.id))
    .returning({ id: applications.id })

  return c.json({
    application: dbResult,
  })
})

app.post('/status', zValidator('json', UpdateApplicationStatus), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db
    .update(applications)
    .set({
      status: req.status,
    })
    .where(eq(applications.id, req.id))
    .returning({ id: applications.id })

  return c.json({
    application: dbResult,
  })
})
