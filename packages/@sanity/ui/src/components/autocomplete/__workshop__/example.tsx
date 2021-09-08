import {Autocomplete, Box, Card, Container, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useMemo, useState} from 'react'
import {
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'
import countries from '../__fixtures__/countries'

export default function ExampleStory() {
  const layoutTone = useSelect('Layout tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Layout')
  const options = useMemo(() => countries.map((country) => ({value: country.code})), [])
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = Number(useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props'))
  const openButton = useBoolean('Open button', false, 'Props')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const radius = Number(useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2, 'Props'))
  const readOnly = useBoolean('Read only', false, 'Props')
  const [value, setValue] = useState('')

  const handleChange = useCallback((value: string) => setValue(value), [])

  return (
    <Card height="fill" tone={layoutTone}>
      <Container width={1}>
        <Box padding={[3, 4, 5]}>
          <Stack space={3}>
            <Text as="label" htmlFor="default" size={1} weight="semibold">
              Country code
            </Text>
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
              value={value}
            />
          </Stack>
        </Box>
      </Container>
    </Card>
  )
}
