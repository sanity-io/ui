import {Autocomplete, Box, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'
import countries from '../__fixtures__/countries'

export default function ExampleStory() {
  const options = countries.map((country) => ({value: country.code}))
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = Number(useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props'))
  const openButton = useBoolean('Open button', false, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const radius = Number(useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2, 'Props'))
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Text as="label" htmlFor="default" size={1} weight="semibold">
          Country code
        </Text>
        <Autocomplete
          border={border}
          customValidity={customValidity}
          disabled={disabled}
          fontSize={fontSize}
          id="default"
          openButton={openButton}
          options={options}
          padding={padding}
          radius={radius}
          readOnly={readOnly}
        />
      </Stack>
    </Box>
  )
}
