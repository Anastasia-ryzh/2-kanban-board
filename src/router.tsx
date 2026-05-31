import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import BoardPage from './pages/BoardPage'
import TaskPage from './pages/TaskPage'
import CreatePage from './pages/CreatePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Страница не найдена</div>,
    children: [
      { index: true, element: <BoardPage /> },
      { path: 'create', element: <CreatePage /> },
      { path: 'tasks/:id', element: <TaskPage /> },
    ],
  },
])