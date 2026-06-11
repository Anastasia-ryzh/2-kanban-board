import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUpdateTaskStatus, useDeleteTask } from '../hooks/useTasks'
import { type Task } from '../types/task'
import { Container, Paper, Typography, Button, Box, Divider } from '@mui/material'

const TaskPage = () => {
  const { id } = useParams()
  const numericId = Number(id)
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)

  const updateStatus = useUpdateTaskStatus()
  const deleteTask = useDeleteTask()

  useEffect(() => {
    const loadTask = () => {
      setLoading(true)
      fetch(`https://jsonplaceholder.typicode.com/todos/${numericId}`)
        .then(res => res.json())
        .then(todo => {
          const savedStatus = localStorage.getItem(`task_${numericId}_status`)
          const status = savedStatus ? parseInt(savedStatus) : (todo.completed ? 2 : 0)
          setTask({
            id: todo.id,
            title: todo.title,
            description: 'Описание отсутствует',
            createdAt: new Date(),
            status: status as 0 | 1 | 2,
          })
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }

    loadTask()
  }, [numericId])

  const handleStatusChange = (newStatus: number) => {
    if (numericId) {
      localStorage.setItem(`task_${numericId}_status`, String(newStatus))
      updateStatus.mutate(
        { id: numericId, status: newStatus as 0 | 1 | 2 },
        {
          onSuccess: () => {
            window.location.href = '/'
          },
        }
      )
    }
  }

  const handleDelete = () => {
    if (numericId && confirm('Удалить задачу?')) {
      deleteTask.mutate(numericId, {
        onSuccess: () => {
          window.location.href = '/'
        },
      })
    }
  }

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Загрузка...</Typography>
  if (!task) return <Typography align="center" sx={{ mt: 4 }}>Задача не найдена. ID: {numericId}</Typography>

  const statusText = task.status === 0 ? 'К выполнению' : task.status === 1 ? 'В работе' : 'Выполнено'
  const statusColor = task.status === 0 ? '#ed6c02' : task.status === 1 ? '#1976d2' : '#2e7d32'

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Задача #{task.id}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Название</Typography>
          <Typography variant="body1">{task.title}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Описание</Typography>
          <Typography variant="body1">{task.description}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Дата создания</Typography>
          <Typography variant="body1">{task.createdAt.toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">Статус</Typography>
          <Typography variant="body1" sx={{ color: statusColor, fontWeight: 'bold' }}>
            {statusText}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {task.status !== 1 && (
            <Button variant="contained" color="primary" onClick={() => handleStatusChange(1)}>
              В работу
            </Button>
          )}
          {task.status !== 2 && (
            <Button variant="contained" color="success" onClick={() => handleStatusChange(2)}>
              Выполнено
            </Button>
          )}
          {task.status !== 0 && (
            <Button variant="outlined" onClick={() => handleStatusChange(0)}>
              Вернуть к выполнению
            </Button>
          )}
          <Button variant="contained" color="error" onClick={handleDelete}>
            Удалить
          </Button>


</Box>

        <Button component={Link} to="/" variant="text">
          ← Назад к доске
        </Button>
      </Paper>
    </Container>
  )
}

export default TaskPage