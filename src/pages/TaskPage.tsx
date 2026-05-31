import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { type Task } from '../types/task'

const TaskPage = () => {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((todo) => {
        const formattedTask: Task = {
          id: todo.id,
          title: todo.title,
          description: 'Описание отсутствует',
          createdAt: new Date(),
          status: todo.completed ? 2 : 0,
        }

        setTask(formattedTask)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div>Загрузка...</div>
  if (!task) return <div>Задача не найдена</div>

  const statusText =
    task.status === 0
      ? 'К выполнению'
      : task.status === 1
      ? 'В работе'
      : 'Выполнено'

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Задача #{task.id}</h2>
      <p>
        <strong>Название:</strong> {task.title}
      </p>
      <p>
        <strong>Описание:</strong> {task.description}
      </p>
      <p>
        <strong>Дата создания:</strong> {task.createdAt.toLocaleDateString()}
      </p>
      <p>
        <strong>Статус:</strong> {statusText}
      </p>
      <Link to="/">← Назад к доске</Link>
    </div>
  )
}

export default TaskPage