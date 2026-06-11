import { Link } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { type Task } from '../types/task'
import { Container, Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material'

const TaskColumn = ({ title, tasks, bgColor }: { title: string; tasks: Task[]; bgColor: string }) => (
  <Paper elevation={3} sx={{ p: 2, backgroundColor: bgColor, minHeight: '70vh' }}>
    <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
      {title} ({tasks.length})
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              #{task.id}
            </Typography>
            <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#1976d2' }}>
                {task.title}
              </Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Paper>
)

const BoardPage = () => {
  const { data: tasks, isLoading } = useTasks()

  if (isLoading) return <Typography align="center" sx={{ mt: 4 }}>Загрузка...</Typography>

  const todoTasks = tasks?.filter(t => t.status === 0) || []
  const inProgressTasks = tasks?.filter(t => t.status === 1) || []
  const doneTasks = tasks?.filter(t => t.status === 2) || []

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TaskColumn title="К выполнению" tasks={todoTasks} bgColor="#fff3e0" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TaskColumn title="В работе" tasks={inProgressTasks} bgColor="#e3f2fd" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TaskColumn title="Выполнено" tasks={doneTasks} bgColor="#e8f5e9" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default BoardPage