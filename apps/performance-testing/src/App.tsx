import {lazy, Suspense} from 'react'

const routes: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  'ui-poc': lazy(() => import('./pages/ui-poc')),
  'ui3': lazy(() => import('./pages/ui3')),
  'ui4': lazy(() => import('./pages/ui4')),
}

function Index() {
  return (
    <div>
      <h1>Performance tests</h1>
      <ul>
        <li>
          <a href="?route=ui-poc">ui-poc</a>
        </li>
        <li>
          <a href="?route=ui3">ui3</a>
        </li>
        <li>
          <a href="?route=ui4">ui4</a>
        </li>
      </ul>
    </div>
  )
}

const route = new URLSearchParams(window.location.search).get('route')
const Page = (route && routes[route]) || Index

export default function App() {
  return route ? (
    <Suspense>
      <Page />
    </Suspense>
  ) : (
    <Page />
  )
}
