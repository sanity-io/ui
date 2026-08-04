import {Outlet} from 'react-router'

import {DepthMonitor} from './components/DepthMonitor'

// The shell is plain HTML on purpose: neither library's components should
// render on the other library's page. Nav uses full-page links (not client
// routing) so switching libraries starts from a clean slate.
function App() {
  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          padding: '12px 16px',
          borderBottom: '1px solid #ddd',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <strong>DOM depth test harness</strong>
        <nav style={{display: 'flex', gap: 12}}>
          <a href="/">UI 5</a>
          <a href="/ui3">UI 3</a>
        </nav>
      </header>

      <main style={{padding: 16}}>
        <Outlet />
      </main>

      <DepthMonitor />
    </>
  )
}

export default App
