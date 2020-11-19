import {Icon, Inline, Text} from '@sanity/ui'
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

  const textProps = {accent, muted, size, weight}

  return (
    <Card>
      <Inline space={3}>
        <Text {...textProps}>
          <Icon symbol="ok-hand" />
        </Text>
        <Text {...textProps}>Hello, world</Text>
      </Inline>
    </Card>
  )
}
