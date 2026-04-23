import {Box, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
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

const theme = buildTheme()

export default function Ui3() {
  return (
    <ThemeProvider theme={theme}>
      <h1>UI v3</h1>
      <h2>{count} Boxes</h2>
      <Profiler id="Boxes" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2} height="100%" sizing={['content', 'box']}>
            {/* TODO: Codemod could not migrate the Box component below */}
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>
    </ThemeProvider>
  )
}
