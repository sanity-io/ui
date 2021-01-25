import {Container, Text} from '@sanity/ui'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {Card} from '../card'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Text',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const accent = boolean('Accent', false, 'Props')

  const align =
    select('Align', ['left', 'right', 'center', 'justify', 'initial'], '', 'Props') || undefined

  const muted = boolean('Muted', false, 'Props')

  const size = select('Size', {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}, 2, 'Props')

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
        <Text
          accent={accent}
          align={align}
          muted={muted}
          size={size}
          textOverflow={textOverflow}
          weight={weight}
        >
          {textChild}
        </Text>
      </Card>
    </Container>
  )
}
