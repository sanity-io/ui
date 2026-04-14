import 'ui4/css/index.css'

import { Profiler } from 'react'
import { Box, Root } from 'ui4'

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

export default function Ui4() {
  return (
    <Root lang='en'>
      <h1>UI v4</h1>
      <h2>{count} Boxes</h2>
      <Profiler id='Boxes' onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2}>
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>
    </Root>
  )
}
