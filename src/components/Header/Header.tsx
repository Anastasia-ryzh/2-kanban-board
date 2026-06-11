import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            📋 Доска задач
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Доска
          </Button>
          <Button color="inherit" component={Link} to="/create">
            + Создать задачу
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header