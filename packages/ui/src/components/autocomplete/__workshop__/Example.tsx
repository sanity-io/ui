import {SearchIcon} from '@sanity/icons'
import {Autocomplete, Text} from '@sanity/ui'
import {FONT_TEXT_SIZE, RADIUS, SPACE} from '@sanity/ui/theme'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {type PerfTestProps, usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {fireEvent} from '@testing-library/dom'
import {useCallback, useMemo, useState} from 'react'

import {CardWrapper} from '$workshop'

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

  const options = useMemo(() => countries.map((country) => ({value: country.code})), [])
  const border = useBoolean('Border', true)
  const customValidity = useText('Custom validity')
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', FONT_TEXT_SIZE)
  const openButton = useBoolean('Open button', false)
  const padding = useSelect('Padding', SPACE)
  const radius = useSelect('Radius', RADIUS)
  const readOnly = useBoolean('Read only', false)
  const [value, setValue] = useState('')

  const handleChange = useCallback((value: string) => setValue(value), [])

  return (
    <CardWrapper alignItems="flex-start" pattern="halftone">
      <Text as="label" htmlFor="default" marginBottom={3} size={1} weight="medium">
        Country code
      </Text>
      <Wrapper>
        <Autocomplete
          ref={ref}
          border={border}
          customValidity={customValidity}
          disabled={disabled}
          fontSize={fontSize}
          icon={SearchIcon}
          id="default"
          openButton={openButton}
          options={options}
          padding={padding}
          placeholder="Search"
          radius={radius}
          readOnly={readOnly}
          value={value}
          onChange={handleChange}
        />
      </Wrapper>
    </CardWrapper>
  )
}
