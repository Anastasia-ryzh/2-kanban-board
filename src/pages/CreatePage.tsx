import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTask } from '../hooks/useTasks'
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const createTask = useCreateTask()

  const handleSubmit = () => {
    if (!title.trim()) {
      inputRef.current?.focus()
      return
    }

    createTask.mutate({
      title,
      description,
    })

    navigate('/')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Создать задачу
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            inputRef={inputRef}
            label="Название"
            placeholder="Введите название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Описание"
            placeholder="Введите описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} size="large">
            Создать
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreatePage