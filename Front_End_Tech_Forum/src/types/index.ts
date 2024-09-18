export type Thread = {
  id: number
  title: string
  isFixed: boolean
  createdAt: Date
  author: User
}

export type ThreadSet = {
  id: number
  name: string
  description: string
}

type Role = {
  name: string
}

type Image = {
  url: string
}

export type User = {
  id: number,
  username: string,
  role: Role,
  image: Image,
  email: string
}

export interface ApplicationError {
  error: {
    name: string,
    message: string,
  }
}
