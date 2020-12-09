import {Icon} from '@sanity/icons'
import {Card, Heading, Inline} from '@sanity/ui'
import {boolean, select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Heading',
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
        <Heading {...textProps}>
          <Icon symbol="ok-hand" />
        </Heading>
        <Heading {...textProps}>Hello, world</Heading>
      </Inline>
    </Card>
  )
}
