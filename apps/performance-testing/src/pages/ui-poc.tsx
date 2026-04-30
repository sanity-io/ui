import '@sanity-labs/ui-poc/styles.css'

import {AddIcon} from '@sanity/icons'
import {Box, Card, Icon} from '@sanity-labs/ui-poc'
import {Profiler} from 'react'

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

export default function UiPoc() {
  return (
    <div>
      <h1>UI POC</h1>
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
          <Card key={i} density={['regular', 'loose']} marginBottom={2}>
            <span>Card content</span>
          </Card>
        ))}
      </Profiler>

      <h2>{count} Icons</h2>
      <Profiler id="Icons" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Icon key={i} icon={AddIcon} size="md" tone="primary" />
        ))}
      </Profiler>
    </div>
  )
}
