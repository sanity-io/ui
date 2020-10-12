import {withCentered} from '~/storybook/decorators'
import {Button, Popover, Text} from '@sanity/ui'
import {boolean, withKnobs, select} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Atoms/Popover',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const open = boolean('Open', false, 'Props')

  const padding = select(
    'Padding',
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

  const placement = select(
    'Placement',
    {
      Top: 'top',
      'Top start': 'top-start',
      'Top end': 'top-end',
      Right: 'right',
      'Right start': 'right-start',
      'Right end': 'right-end',
      Left: 'left',
      'Left start': 'left-start',
      'Left end': 'left-end',
      Bottom: 'bottom',
      'Bottom start': 'bottom-start',
      'Bottom end': 'bottom-end',
    },
    'bottom',
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

  return (
    <Popover
      content={<Text>Popover content</Text>}
      open={open}
      padding={padding}
      placement={placement}
      radius={radius}
    >
      <Button>Hello</Button>
    </Popover>
  )
}
