import {Card, Heading} from '@sanity/ui'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {Container} from '../container'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Heading',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const accent = boolean('Accent', false, 'Props')

  const muted = boolean('Muted', false, 'Props')

  const size = select('Size', {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}, 2, 'Props')

  const textChild = text('Text', 'Hello, world', 'Props')

  const textOverflow =
    select('Text overflow', {None: '', Ellipsis: 'ellipsis'}, '', 'Props') || undefined

  const weight =
    select(
      'Weight',
      {
        'Regular (default)': '',
        Medium: 'medium',
        Semibold: 'semibold',
        Bold: 'bold',
      },
      '',
      'Props'
    ) || undefined

  return (
    <Container width={0}>
      <Card padding={4}>
        <Heading
          accent={accent}
          muted={muted}
          size={size}
          textOverflow={textOverflow}
          weight={weight}
        >
          {textChild}
        </Heading>
      </Card>
    </Container>
  )
}
