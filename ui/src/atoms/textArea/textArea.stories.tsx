import {Card, Container, Stack, Text, TextArea} from '@sanity/ui'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/TextArea',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const border = boolean('Border', true, 'Props')

  const customValidity = text('Custom validity', '', 'Props') || undefined

  const disabled = boolean('Disabled', false, 'Props')

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3 (default)': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    3,
    'Props'
  )

  const placeholder = text('Placeholder', '', 'Props') || undefined

  const radius = select(
    'Radius',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
    },
    0,
    'Props'
  )

  const size = select('Size', {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}, 2, 'Props')

  const weight = select(
    'Weight',
    {'Regular (default)': undefined, Semibold: 'semibold', Bold: 'bold'},
    undefined,
    'Props'
  )

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Text as="label" htmlFor="text-area-example" size={1} weight="semibold">
            TextArea
          </Text>
          <TextArea
            border={border}
            customValidity={customValidity}
            disabled={disabled}
            id="text-area-example"
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            size={size}
            weight={weight}
          />
        </Stack>
      </Card>
    </Container>
  )
}
