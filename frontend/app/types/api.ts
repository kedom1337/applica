export type ApplicationStatus = 'pending' | 'accepted' | 'declined'

export type Application = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  courseId: number
  semester?: number
  degree?: string
  experience?: string
  status: ApplicationStatus
  messaged?: boolean
  talked?: boolean
  clubBriefed?: boolean
  securityBriefed?: boolean
  information?: string
  created: Date
  updatedAt: Date
}
