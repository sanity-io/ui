import {Card, Container, Label} from '@sanity/ui'
import {select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Label',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select(
    'Size',
    {'0': 0, '1': 1, '2 (default)': undefined, '3': 3, '4': 4},
    undefined,
    'Props'
  )

  const textChild = text('Text', 'Hello, world', 'Props')

  const textOverflow =
    select('Text overflow', {None: '', Ellipsis: 'ellipsis'}, '', 'Props') || undefined

  const weight = select(
    'Weight',
    {
      'Regular (default)': undefined,
      Medium: 'medium',
      Semibold: 'semibold',
      Bold: 'bold',
    },
    undefined,
    'Props'
  )

  return (
    <Container width={0}>
      <Card padding={4}>
        <Label size={size} textOverflow={textOverflow} weight={weight}>
          {textChild}
        </Label>
      </Card>
    </Container>
  )
}
