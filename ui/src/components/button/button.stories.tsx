import {withCentered} from '~/storybook/decorators'
import icons from '@sanity/icons'
import {Button, IconSymbol, Stack} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

// const a = 0 - (25 - (21 - 11)) / 2 // = 7
// calc(0 - (var(--text-icon-size) - (var(--text-line-height) - var(--text-cap-height))) / 2)
// calc(0 - (var(--text-icon-size) - (var(--text-line-height) - var(--text-cap-height))) / 2);

export default {
  title: 'Button',
  decorators: [withCentered, withKnobs],
}

const iconOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
  acc[key] = key
  return acc
}, {})

export const plain = () => {
  const icon = select('Symbol', iconOptions, 'add-circle', 'Props') as IconSymbol

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
        icon={icon}
        mode={mode}
        onClick={action('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        tone={tone}
      >
        {/* Button */}
      </Button>
    </Stack>
  )
}
