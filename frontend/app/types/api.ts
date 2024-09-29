export type ApplicationStatus = 'pending' | 'accepted' | 'declined'

export type Course = {
  id: number
  name: string
  created: string
  updatedAt: string
}

export type Field = {
  id: number
  name: string
  created: string
  updatedAt: string
}

export type Application = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  semester?: number
  degree?: string
  experience?: string
  status: ApplicationStatus
  messaged?: boolean
  talked?: boolean
  clubBriefed?: boolean
  securityBriefed?: boolean
  information?: string
  created: string
  updatedAt: string
  course: Course
  fields: Field[]
}

export type DeleteApplication = {
  id: number
}

export type UpdateApplicationStatus = {
  id: number
  status: ApplicationStatus
}
