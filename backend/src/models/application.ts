import { z } from 'zod'
import { applications } from '../db'
import { createInsertSchema } from 'drizzle-zod'

const BaseSchema = createInsertSchema(applications, {
  email: (z) => z.email.email(),
})

export const InsertApplication = BaseSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  courseId: true,
  semester: true,
  degree: true,
  experience: true,
}).extend({
  fields: z.array(z.number().int().positive()),
})

export const UpdateApplication = BaseSchema.partial()
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    courseId: true,
    semester: true,
    degree: true,
    experience: true,
    messaged: true,
    talked: true,
    clubBriefed: true,
    securityBriefed: true,
    information: true,
  })
  .extend({
    id: z.number().int().positive(),
    fields: z.array(z.number().int().positive()).optional(),
  })

export const UpdateApplicationStatus = BaseSchema.pick({
  status: true,
}).extend({
  id: z.number().int().positive(),
})

export const DeleteApplication = z.object({
  id: z.number().int().positive(),
})
