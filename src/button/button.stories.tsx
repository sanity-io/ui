import {withCentered} from '~/storybook/decorators'
import {Button} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Button',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const paddingX = select(
    'Padding X',
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
    3,
    'Props'
  )

  const paddingY = select(
    'Padding Y',
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
    3,
    'Props'
  )

  const tone = select('Tone', {Default: undefined, Brand: 'brand'}, undefined, 'Props')

  return (
    <Button onClick={action('onClick')} paddingX={paddingX} paddingY={paddingY} tone={tone}>
      Plain
    </Button>
  )
}
