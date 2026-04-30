import 'ui4/css/index.css'

import {AddIcon} from '@sanity/icons'
import {Profiler} from 'react'
import {Box, Card, Root} from 'ui4'

const count = 5000
const iterator = [...Array(count).keys()]

function handleOnRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
) {
  const value = {id, phase, actualDuration, baseDuration, startTime, commitTime}
  const perComponent = actualDuration / count
  /* eslint-disable-next-line no-console */
  console.log(JSON.stringify(value, null, 2))
  /* eslint-disable-next-line no-console */
  console.log({perComponent})
  navigator.clipboard.writeText(String(perComponent))
}

export default function Ui4() {
  return (
    <Root lang="en">
      <h1>UI v4</h1>
      <h2>{count} Boxes</h2>
      <Profiler id="Boxes" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2}>
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>

      <Profiler id="Cards" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} padding={[3, 4]} radius={[2, 3]} marginBottom={2}>
            <span>Card content</span>
          </Card>
        ))}
      </Profiler>

      <h2>{count} Icons</h2>
      <Profiler id="Icons" onRender={handleOnRender}>
        {iterator.map((i) => (
          <AddIcon key={i} />
        ))}
      </Profiler>
    </Root>
  )
}
