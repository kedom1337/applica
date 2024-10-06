import { Hono } from 'hono'
import { applications, applicationsFields, db } from '../db'
import { zValidator } from '@hono/zod-validator'
import {
  DeleteApplication,
  InsertApplication,
  UpdateApplicationStatus,
  UpdateApplication,
  type RawApplicationWithFields,
} from '../models/application'
import { eq } from 'drizzle-orm'

export const app = new Hono().basePath('/applications')

app.get('/', async (c) => {
  try {
    const dbResult = await db.query.applications.findMany({
      columns: {
        courseId: false,
      },
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

    const flattenedResult = dbResult.map((application) => ({
      ...application,
      fields: application.fields.map((field) => field.field),
    }))

    return c.json(flattenedResult)
  } catch (err) {
    return c.json({ error: err }, 500)
  }
})

app.post('/', zValidator('json', InsertApplication), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db.transaction(
    async (tx): Promise<RawApplicationWithFields> => {
      const [newApplication] = await tx
        .insert(applications)
        .values(req)
        .returning()

      const newFields = await tx
        .insert(applicationsFields)
        .values(
          req.fields.map((fieldId) => ({
            applicationId: newApplication.id,
            fieldId,
          }))
        )
        .returning()

      return {
        ...newApplication,
        fields: newFields,
      }
    }
  )

  return c.json(dbResult)
})

app.put('/', zValidator('json', UpdateApplication), async (c) => {
  const req = c.req.valid('json')

  const dbResult = await db.transaction(
    async (tx): Promise<RawApplicationWithFields> => {
      const updatedApplication = await tx
        .update(applications)
        .set(req)
        .where(eq(applications.id, req.id))
        .returning()

      let res: RawApplicationWithFields = {}
      if (updatedApplication.length > 0) {
        res = updatedApplication[0]

        await tx
          .delete(applicationsFields)
          .where(eq(applicationsFields.applicationId, req.id))

        res.fields = []
        if (req.fields.length > 0) {
          const updatedFields = await tx
            .insert(applicationsFields)
            .values(
              req.fields.map((fieldId) => ({
                applicationId: req.id,
                fieldId,
              }))
            )
            .returning()

          res.fields = updatedFields
        }
      }

      return res
    }
  )

  return c.json(dbResult)
})

app.delete('/', zValidator('json', DeleteApplication), async (c) => {
  const req = c.req.valid('json')

  const [dbResult] = await db
    .delete(applications)
    .where(eq(applications.id, req.id))
    .returning({ id: applications.id })

  return c.json(dbResult)
})

app.post('/status', zValidator('json', UpdateApplicationStatus), async (c) => {
  const req = c.req.valid('json')

  const [dbResult] = await db
    .update(applications)
    .set({
      status: req.status,
    })
    .where(eq(applications.id, req.id))
    .returning({ id: applications.id, status: applications.status })

  return c.json(dbResult)
})
