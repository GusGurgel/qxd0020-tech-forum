export type Thread = {
  id: number,
  title: string,
  createAt: Date,
  author: User,
}

export type ThreadSet = {
  id: number
  name: string
  description: string
}

export type User = {
  name: string
}