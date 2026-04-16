import 'ui/styles.css'

import { Profiler } from 'react'
import { Box } from 'ui'

const count = 5000
const iterator = [...Array(count).keys()]

function handleOnRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  const value = { id, phase, actualDuration, baseDuration, startTime, commitTime }
  const perComponent = actualDuration / count
  console.log(JSON.stringify(value, null, 2))
  console.log({ perComponent })
  navigator.clipboard.writeText(String(perComponent))
}

export default function UiPoc() {
  return (
    <div>
      <h1>UI POC</h1>
      <h2>{count} Boxes</h2>
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
