import {Container, Text} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
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

  const textProps = {accent, align, muted, size, weight}

  return (
    <Container width={0}>
      <Card>
        <Text {...textProps}>Hello, world</Text>
      </Card>
    </Container>
  )
}
