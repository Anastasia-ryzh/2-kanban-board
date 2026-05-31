import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { type Task } from '../types/task'

const TaskColumn = ({ title, tasks }: { title: string; tasks: Task[] }) => (
  <div
    style={{
      flex: 1,
      padding: '1rem',
      background: '#f4f4f4',
      borderRadius: '8px',
    }}
  >
    <h3>{title}</h3>

    {tasks.map((task) => (
      <div
        key={task.id}
        style={{
          background: 'white',
          padding: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <Link to={`/tasks/${task.id}`}>#{task.id}</Link> {task.title}
      </div>
    ))}
  </div>
)

const BoardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks: Task[] = data.map(
          (todo: { id: number; title: string; completed: boolean }) => ({
            id: todo.id,
            title: todo.title,
            description: 'Описание отсутствует',
            createdAt: new Date(),
            status: todo.completed ? 2 : 0,
          })
        )

        setTasks(formattedTasks)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Загрузка...</div>

  const todoTasks = tasks.filter((t) => t.status === 0)
  const inProgressTasks = tasks.filter((t) => t.status === 1)
  const doneTasks = tasks.filter((t) => t.status === 2)

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      <TaskColumn title="К выполнению" tasks={todoTasks} />
      <TaskColumn title="В работе" tasks={inProgressTasks} />
      <TaskColumn title="Выполнено" tasks={doneTasks} />
    </div>
  )
}

export default BoardPage