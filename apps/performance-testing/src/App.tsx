import 'ui/styles.css'

import { Profiler } from 'react'
import { Box } from 'ui'

const count = 5000
const iterator = [...Array(count).keys()]

function App() {
  // const [profile, setProfile] = useState(null)

  function handleOnRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    const value = { id, phase, actualDuration, baseDuration, startTime, commitTime }
    const perComponent = actualDuration / count
    console.log(JSON.stringify(value, null, 2))
    console.log({ perComponent })
    navigator.clipboard.writeText(String(perComponent))
  }

  return (
    <div>
      <h1>{count} Boxes</h1>
      <pre>{/*<code>{profile}</code>*/}</pre>
      <Profiler id='Boxes' onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2}>
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>
    </div>
  )
}

export default App
