import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Box component="span" sx={{ mr: 2, fontSize: '1.5rem' }}>
          📋
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Доска задач
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Доска
        </Button>
        <Button color="inherit" component={Link} to="/create">
          + Создать задачу
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header