import {withCentered} from '~/storybook/decorators'
import {Button, Stack } from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Button',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const mode = select(
    'Mode',
    {
      Default: 'default',
      Ghost: 'ghost',
      Bleed: 'bleed',
    },
    'default',
    'Props'
  )

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

  const tone = select(
    'Tone',
    {
      Default: 'default',
      Brand: 'brand',
      Positive: 'positive',
      Caution: 'caution',
      Critical: 'critical',
    },
    'default',
    'Props'
  )

  return (
    <Stack space={2}>
      <Button
        mode={mode}
        onClick={action('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        tone={tone}
      >
        Button
      </Button>
      <Button
        mode={mode}
        onClick={action('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        tone={tone}
        icon="add-circle"
      >
        Button with an icon
      </Button>
    </Stack>
  )
}
