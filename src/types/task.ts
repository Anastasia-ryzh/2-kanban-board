export type TaskStatus = 0 | 1 | 2

export interface Task {
  id: number
  title: string
  description: string
  createdAt: Date
  status: TaskStatus
}