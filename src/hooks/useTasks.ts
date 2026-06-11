import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Task, type TaskStatus } from '../types/task'

const STORAGE_KEY = 'kanban-tasks'

const getLocalTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return []
}

const saveLocalTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await response.json()
  
  const localTasks = getLocalTasks()
  if (localTasks.length > 0) return localTasks
  
  const initialTasks: Task[] = data.map((todo: { id: number; title: string; completed: boolean }) => ({
    id: todo.id,
    title: todo.title,
    description: 'Описание отсутствует',
    createdAt: new Date(),
    status: todo.completed ? 2 : 0 as TaskStatus,
  }))
  
  saveLocalTasks(initialTasks)
  return initialTasks
}

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })
}

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => {
      const tasks = getLocalTasks()
      const taskIndex = tasks.findIndex(t => t.id === id)
      if (taskIndex !== -1) {
        const updatedTask = { ...tasks[taskIndex], status }
        tasks[taskIndex] = updatedTask
        saveLocalTasks(tasks)
      }
      return { id, status }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const tasks = getLocalTasks()
      const filtered = tasks.filter(t => t.id !== id)
      saveLocalTasks(filtered)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTask: { title: string; description: string }) => {
      const tasks = getLocalTasks()
      const newId = Date.now()
      const task: Task = {
        id: newId,
        title: newTask.title,
        description: newTask.description,
        createdAt: new Date(),
        status: 0,
      }
      tasks.push(task)
      saveLocalTasks(tasks)
      return task
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}