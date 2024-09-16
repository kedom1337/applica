export type ApplicationStatus = 'pending' | 'accepted' | 'declined'

export type Application = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  course_id: number
  semester?: number
  degree?: string
  experience?: string
  status: ApplicationStatus
  messaged?: boolean
  talked?: boolean
  club_briefed?: boolean
  security_briefed?: boolean
  information?: string
  created: Date
  updated_at: Date
}
