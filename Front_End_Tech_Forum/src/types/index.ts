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

export type User = {
  name: string
}
