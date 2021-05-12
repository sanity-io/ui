import {Container, Flex, Stack, Text, TextArea, ThemeFontWeightKey} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/text-area', 'TextArea', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

const FONT_SIZE_OPTIONS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4}

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

const RADIUS_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
}

const FONT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey} = {
  Regular: 'regular',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

function PlainStory() {
  const border = useBoolean('Border', true, 'Props')
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', FONT_SIZE_OPTIONS, 2, 'Props')
  const padding = useSelect('Padding', SPACE_OPTIONS, 3, 'Props')
  const placeholder = useText('Placeholder', '', 'Props') || undefined
  const radius = useSelect('Radius', RADIUS_OPTIONS, 0, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')
  const weight = useSelect('Weight', FONT_WEIGHT_OPTIONS, undefined, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={3}>
          <Text as="label" htmlFor="text-area-example" size={1} weight="semibold">
            TextArea
          </Text>
          <TextArea
            border={border}
            customValidity={customValidity}
            disabled={disabled}
            fontSize={fontSize}
            id="text-area-example"
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            readOnly={readOnly}
            weight={weight}
          />
        </Stack>
      </Container>
    </Flex>
  )
}
