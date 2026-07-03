import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'

import App from './App.tsx'
import Ui3 from './routes/ui3.tsx'
import UiPoc from './routes/uiPoc.tsx'

import '@sanity-labs/ui-poc/styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <UiPoc />},
      {path: 'ui3', element: <Ui3 />},
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
