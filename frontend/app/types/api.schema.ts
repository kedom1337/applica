import { z } from 'zod'

export const AddApplication = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  semester: z.number().optional().default(1),
  degree: z.string().max(50).optional(),
  courseId: z.number(),
  fields: z.array(z.number()),
  experience: z.string().optional(),
  messaged: z.boolean().optional(),
  talked: z.boolean().optional(),
  clubBriefed: z.boolean().optional(),
  securityBriefed: z.boolean().optional(),
  information: z.string().optional(),
})
