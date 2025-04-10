import {Autocomplete, Box, Button, Card, Code, Container, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {useCallback, useState} from 'react'

import {
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'
import countries from '../__mocks__/countries'
import {ExampleOption} from './types'

export default function CustomStory() {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))
  const border = useBoolean('Border', true, 'Props')
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = Number(useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props'))
  const openButton = useBoolean('Open button', true, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const radius = Number(useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2, 'Props'))
  const readOnly = useBoolean('Read only', false, 'Props')
  const [value, setValue] = useState('')

  const renderOption = useCallback(
    (option: ExampleOption) => (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={padding}
        radius={radius - 1}
      >
        <Text size={fontSize}>{option.title}</Text>
      </Card>
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
    <Box paddingX={[4, 5, 6]} paddingY={[5, 6, 7]}>
      <Container width={0}>
        <Stack space={5}>
          <Stack space={3}>
            <Text as="label" htmlFor="custom" id="custom-label" size={1} weight="medium">
              Country
            </Text>
            <Autocomplete
              aria-describedby="custom-label"
              border={border}
              disabled={disabled}
              filterOption={filterOption}
              fontSize={fontSize}
              id="custom"
              onChange={setValue}
              openButton={openButton}
              options={options}
              padding={padding}
              placeholder="Search"
              radius={radius}
              readOnly={readOnly}
              renderOption={renderOption}
              renderValue={renderValue}
              value={value}
            />
          </Stack>

          <Card padding={3} radius={2} tone="transparent">
            <Code size={1}>{JSON.stringify(value)}</Code>
          </Card>
          <Box>
            <Button id="set-value-btn" onClick={() => setValue('NO')} text="Set to NO" />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
