import {Autocomplete, Box, Button, Code, Stack} from '@sanity/ui'
import {useCallback, useState} from 'react'

import {CardWrapper} from '$workshop'

export default function FocusAndBlurStory(): React.JSX.Element {
  const [value, setValue] = useState('')
  const [log, setLog] = useState<string[]>([])
  const handleBlur = useCallback(() => setLog((v) => v.concat(['blur'])), [])
  const handleFocus = useCallback(() => setLog((v) => v.concat(['focus'])), [])
  const handleClear = useCallback(() => setLog([]), [])

  return (
    <CardWrapper alignItems="flex-start" pattern="halftone">
      <Stack gap={5}>
        <Autocomplete
          id="focus-and-blur"
          openButton
          options={[{value: 'foo'}, {value: 'bar'}]}
          placeholder="Search"
          value={value}
          onBlur={handleBlur}
          onChange={setValue}
          onFocus={handleFocus}
        />

        <Stack gap={3}>
          <Box muted overflow="auto" padding={3} radius={3}>
            <Code id="focus-and-blur-log" language="json" size={1}>
              {JSON.stringify(log)}
            </Code>
          </Box>

          <Button id="focus-and-blur-clear-btn" mode="ghost" text="Clear" onClick={handleClear} />
        </Stack>
      </Stack>
    </CardWrapper>
  )
}
