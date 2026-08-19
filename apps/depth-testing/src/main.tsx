import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'

import App from './App.tsx'

// Routes are lazy so each page loads only its own library's code and styles.
const Ui5 = lazy(() => import('./routes/ui5.tsx'))
const Ui3 = lazy(() => import('./routes/ui3.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Ui5 />
          </Suspense>
        ),
      },
      {
        path: 'ui3',
        element: (
          <Suspense>
            <Ui3 />
          </Suspense>
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
