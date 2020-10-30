import {Card, Container, TextInput} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/TextInput',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const border = boolean('Border?', true, 'Props')

  const disabled = boolean('Disabled?', false, 'Props')

  const margin = select(
    'Margin',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    0,
    'Props'
  )

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

  // const radius = select(
  //   'Radius',
  //   {
  //     '0': 0,
  //     '1': 1,
  //     '2': 2,
  //     '3': 3,
  //     '4': 4,
  //     '5': 5,
  //     '6': 6,
  //   },
  //   0,
  //   'Props'
  // )

  return (
    <Container width={0}>
      <Card padding={4}>
        <TextInput
          border={border}
          disabled={disabled}
          margin={margin}
          padding={padding}
          radius={radius}
          size={size}
          weight={weight}
        />
      </Card>
    </Container>
  )
}
