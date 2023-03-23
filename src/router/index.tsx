import { Home } from '@/pages'
import { Main } from '@/layouts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    // loader: rootLoader,
    children: [
      {
        path: '/',
        element: <Home />,
        // loader: teamLoader,
      },
    ],
  },
])

const Router: React.FC = () => <RouterProvider router={router} />

export default Router
