import {Autocomplete, Box, Card, Container, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {type PerfTestProps, usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {fireEvent} from '@testing-library/dom'
import {useCallback, useMemo, useState} from 'react'

import {
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '$workshop'

import {countries} from './mock/countries'

const typingPerfTest: PerfTestProps<HTMLInputElement> = {
  name: 'typing',
  title: 'Typing',
  description: 'This test types one character at a time',
  run({target}) {
    const text = 'Hello, world & Hello, world & Hello, world'
    const len = text.length

    for (let i = 0; i < len; i += 1) {
      const value = text.slice(0, i + 1)

      fireEvent.change(target, {target: {value}})
    }
  },
}

export default function ExampleStory(): React.JSX.Element {
  const {ref, Wrapper} = usePerfTest(typingPerfTest)

  const layoutTone = useSelect('Layout tone', WORKSHOP_CARD_TONE_OPTIONS)
  const options = useMemo(() => countries.map((country) => ({value: country.code})), [])
  const border = useBoolean('Border', true)
  const customValidity = useText('Custom validity')
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  const openButton = useBoolean('Open button', false)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2)
  const readOnly = useBoolean('Read only', false)
  const [value, setValue] = useState('')

  const handleChange = useCallback((value: string) => setValue(value), [])

  return (
    <Card height="fill" tone={layoutTone}>
      <Container width={1}>
        <Box paddingX={[4, 5, 6]} paddingY={[5, 6, 7]}>
          <Stack gap={3}>
            <Text as="label" htmlFor="default" size={1} weight="medium">
              Country code
            </Text>
            <Wrapper>
              <Autocomplete
                border={border}
                customValidity={customValidity}
                disabled={disabled}
                fontSize={fontSize}
                onChange={handleChange}
                id="default"
                openButton={openButton}
                options={options}
                padding={padding}
                placeholder="Search"
                radius={radius}
                readOnly={readOnly}
                ref={ref}
                value={value}
              />
            </Wrapper>
          </Stack>
        </Box>
      </Container>
    </Card>
  )
}
