// import icons from '@sanity/icons'
import {Badge, Stack} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Badge',
  decorators: [withCentered, withKnobs],
}

// const iconOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
//   acc[key] = key
//   return acc
// }, {})

export const plain = () => {
  // const icon = select('Symbol', iconOptions, 'add-circle', 'Props') as IconSymbol

  const mode = select(
    'Mode',
    {
      Default: 'default',
      Outline: 'outline',
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

  const textProp = text('Text', 'Label', 'Props')

  return (
    <Stack space={2}>
      <Badge
        // icon={icon}
        mode={mode}
        onClick={action('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        // text={textProp}
        tone={tone}
      >
        {textProp}
      </Badge>
    </Stack>
  )
}
