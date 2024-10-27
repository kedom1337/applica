export type User = {
  sub: string
  name: string
  exp: number
}

export type LoginResponse = {
  user: User
  token: string
}

export type VerifyResponse = Pick<LoginResponse, 'user'>
