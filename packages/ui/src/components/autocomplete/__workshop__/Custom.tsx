import {SearchIcon} from '@sanity/icons'
import {Autocomplete, Box, Button, Code, Selectable, Stack, Text} from '@sanity/ui'
import type {Radius} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {useCallback, useState} from 'react'

import {
  CardWrapper,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '$workshop'

import {countries} from './mock/countries'
import type {ExampleOption} from './types'

export default function CustomStory(): React.JSX.Element {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))
  const border = useBoolean('Border', true)
  const disabled = useBoolean('Disabled', false)

  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2)
  const openButton = useBoolean('Open button', true)

  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)

  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 3)
  const readOnly = useBoolean('Read only', false)
  const [value, setValue] = useState('')

  const renderOption = useCallback(
    (option: ExampleOption) => (
      <Selectable
        key={option.value}
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        padding={padding}
        radius={typeof radius === 'number' ? (Math.max((radius ?? 0) - 1, 0) as Radius) : radius}
        onClick={(event) => event.preventDefault()}
      >
        <Text size={fontSize}>{option.title}</Text>
      </Selectable>
    ),
    [fontSize, padding, radius],
  )

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <CardWrapper alignItems="flex-start" pattern="halftone">
      <Stack gap={5}>
        <Stack gap={3}>
          <Text as="label" htmlFor="custom" id="custom-label" size={1} weight="medium">
            Country
          </Text>
          <Autocomplete
            aria-describedby="custom-label"
            border={border}
            disabled={disabled}
            filterOption={filterOption}
            fontSize={fontSize}
            icon={SearchIcon}
            id="custom"
            openButton={openButton}
            options={options}
            padding={padding}
            placeholder="Search"
            radius={radius}
            readOnly={readOnly}
            renderOption={renderOption}
            renderValue={renderValue}
            value={value}
            onChange={setValue}
          />
        </Stack>

        <Box muted padding={4} radius={3}>
          <Code language="json" size={1}>
            {JSON.stringify(value)}
          </Code>
        </Box>

        <Box>
          <Button id="set-value-btn" text="Set to NO" onClick={() => setValue('NO')} />
        </Box>
      </Stack>
    </CardWrapper>
  )
}
